import { AppEventEmittersService } from './../../common/shared/app-event-emitters.service';
import { TdLoadingService } from '@covalent/core';
import { Component, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import { DatePipe } from '@angular/common';
import { zh } from './../../common/shared/zh';
import { ToastsManager } from 'ng2-toastr';
import { RegularService } from '../../common/shared/regular.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { OwnerIdentityService } from '../../owner-identity/shared/owner-identity.service';
import { CarService } from '../../car/shared/car.service';
import { EventBuservice } from './../../common/shared/eventbus.service';
import { GnssData } from '../../common/shared/gnss-data';

declare var Maplet: any;
declare var mianMapObject: any;
declare var MPoint: any;
declare var MMarker: any;
declare var MIcon: any;
declare var MInfoWindow: any;
declare var MBrush: any;
declare var MPolyline: any;


@Component({
  selector: 'app-car-history-map',
  templateUrl: './car-history-map.component.html',
  styleUrls: ['./car-history-map.component.css']
})
export class CarHistoryMapComponent implements OnInit, OnDestroy {
  historyLocations = [];
  locationCount: number;

  warnings = [];

  licenseNo: string;
  startDate: any;
  endDate: any;
  zh = zh;

  maplet: any;

  playIndex: number;
  playTimer: any;
  playPoints: any[];
  palyerAction: string;

  carMarker: any;
  playline: any;

  subscription: any;

  playTimes: number;
  progress: number;
  progressTimer: any;

  constructor(private _toastr: ToastsManager
    , private _regularService: RegularService
    , private datePipe: DatePipe
    , private _ownerService: OwnerIdentityService
    , private _carService: CarService
    , private _loadingService: TdLoadingService
    , private _appEmitterService: AppEventEmittersService) {
    this.licenseNo = '';
    const current: any = new Date();
    this.startDate = null;
    this.endDate = null;
    this.playIndex = -1;
    this.playPoints = [];
    this.locationCount = 0;
    this.palyerAction = '';
    this.playTimes = 1;
    this.progress = 0;


    this.subscription = _appEmitterService.tabChange.subscribe((inputs: any) => {
      if (inputs.code === 'historyMap' && inputs.licenseNo) {
        this.licenseNo = inputs.licenseNo;
        this.endDate = new Date();
        this.startDate = new Date();
        this.startDate.setHours(new Date().getHours() - 1);
        this.search();
      }
    })
  }

  ngOnInit() {
    this.maplet = new Maplet('historyMap')
    mianMapObject.initMap(this.maplet, 'historyMap');
  }

  search() {
    if (!this.validate()) {
      return false;
    }
    this.clear();
    this._loadingService.register();
    this._carService.getHistoryInfo(this.licenseNo
      , this.datePipe.transform(this.startDate, 'yyyy-MM-dd HH:mm')
      , this.datePipe.transform(this.endDate, 'yyyy-MM-dd HH:mm')).subscribe(
      res => {
        this._loadingService.resolve();
        this.historyLocations = res.historyLocations;
        this.locationCount = this.historyLocations.length;
        this.warnings = res.warnings;
        this.showPath();
      }
      );
  }

  clear() {
    this.playIndex = 0;
    this.playPoints = [];
    this.locationCount = 0;
    this.playTimes = 1;
    this.progress = 0;
    if (this.carMarker) {
      this.maplet.removeOverlay(this.carMarker);
    }
    if (this.playline) {
      this.maplet.removeOverlay(this.playline);
    }
  }

  showPath() {
    this.palyerAction = '';
    this.maplet.clearOverlays(true);
    for (let i = 0; i < this.locationCount; i++) {
      const pointData = this.historyLocations[i];
      const point = new MPoint(pointData.geoPoint);
      const marker = new MMarker(
        point,
        new MIcon('<span style="color: ' + (pointData.alarmState === 0 ? 'green' : 'red')
          + ' "  width="8px" height="8px">●</span>', 8, 8),
        new MInfoWindow('详细信息', GnssData.getRealTimeInfo(pointData))
      );
      this.maplet.addOverlay(marker);
      if (i === 0) {
        const val = pointData.geoPoint.split(',');
        mianMapObject.resetCenter(this.maplet, val[0], val[1])
      }
    }
  }

  start() {
    if (this.locationCount === 0) {
      this._toastr.error('暂无位置信息，无法播放！');
      return;
    }
    this.playIndex = 0;
    this.playTimes = 1;
    this.palyerAction = 'start';
    this.play();
  }

  goOn() {
    this.palyerAction = 'goOn';
    this.play();
  }

  play() {
    this.playTimerHandler();
    this.initPlayTimer();
  }

  initPlayTimer() {
    this.playTimer = setInterval(() => {
      this.playTimerHandler();
    }, 1000 / this.playTimes);
  }

  fastforward() {
    clearInterval(this.playTimer);
    if (this.playTimes * 2 < 33) {
      this.playTimes *= 2;
    } else {
      this.playTimes = 1;
    }
    this.play();
  }

  playTimerHandler() {

    if (this.playIndex >= this.locationCount) {
      clearInterval(this.playTimer)
      return;
    }
    this.resetProgress();
    if (this.carMarker) {
      this.maplet.removeOverlay(this.carMarker);
    }
    if (this.playline) {
      this.maplet.removeOverlay(this.playline);
    }

    const pointData = this.historyLocations[this.playIndex];
    this.playIndex += 1;

    const point = new MPoint(pointData.geoPoint);
    this.carMarker = new MMarker(
      point,
      new MIcon('<img class="con" id="icon_realTimeMonitor" src="assets/images/car0.png"  width="24px" height="48px"/>', 24, 48)
    );
    this.maplet.addOverlay(this.carMarker);
    mianMapObject.setDirection('icon_realTimeMonitor', pointData.direction);


    this.playPoints.push(point);
    if (this.playPoints.length > 1) {
      const brush = new MBrush('#3287ff', 8);
      brush.transparency = 70;
      this.playline = new MPolyline(this.playPoints, brush, null);
      this.maplet.addOverlay(this.playline);
    }
  }

  suspend() {
    this.palyerAction = 'suspend';
    clearInterval(this.playTimer);
  }

  replay() {
    this.palyerAction = 'replay';
    this.playTimes = 1;
    clearInterval(this.playTimer);
    this.playPoints = [];
    this.playIndex = 0;
    this.play();
  }

  handleChange(e) {
    clearInterval(this.progressTimer);

    this.progressTimer = setTimeout(() => {
      this.changeProgress()
    }, 50);

  }

  changeProgress() {
    clearInterval(this.playTimer)

    if (this.locationCount === 0) {
      this._toastr.error('暂无位置信息，无法播放！');
      return;
    }
    this.palyerAction = 'start';

    if (this.carMarker) {
      this.maplet.removeOverlay(this.carMarker);
    }
    if (this.playline) {
      this.maplet.removeOverlay(this.playline);
    }

    this.playIndex = Math.floor(this.locationCount * this.progress / 100);
    if (this.locationCount > 0 && this.playIndex === this.locationCount) {
      this.playIndex -= 1;
    }

    this.playPoints = [];
    for (let i = 0; i <= this.playIndex; i++) {
      const pointData = this.historyLocations[i];
      const point = new MPoint(pointData.geoPoint);
      this.playPoints.push(point);

      if (i === this.playIndex) {
        this.carMarker = new MMarker(
          point,
          new MIcon('<img class="con" id="icon_realTimeMonitor" src="assets/images/car0.png"  width="24px" height="48px"/>', 24, 48)
        );
        this.maplet.addOverlay(this.carMarker);
        mianMapObject.setDirection('icon_realTimeMonitor', pointData.direction);
      }
    }

    if (this.playPoints.length > 1) {
      const brush = new MBrush('#3287ff', 8);
      brush.transparency = 70;
      this.playline = new MPolyline(this.playPoints, brush, null);
      this.maplet.addOverlay(this.playline);
    }
    this.playIndex += 1;
    this.initPlayTimer();
  }

  resetProgress() {
    console.log(`${this.playIndex}===${this.locationCount}`)
    this.progress = Math.floor((this.playIndex + 1) / this.locationCount * 100);
  }

  validate() {
    const startDate = new Date(this.startDate).getTime();
    const endDate = new Date(this.endDate).getTime();
    if (!this.licenseNo) {
      this._toastr.error('请输入车牌号！');
      return false;
    }
    if (!this.startDate) {
      this._toastr.error('请选择开始时间！');
      return false;
    }
    if (!this.endDate) {
      this._toastr.error('请选择结束时间！');
      return false;
    }
    if (endDate < startDate) {
      this._toastr.error('查询结束时间不能小于开始时间！');
      return false;
    }
    return true
  }

  ngOnDestroy() {
    clearInterval(this.playTimer);
    clearInterval(this.progressTimer);
    this.subscription.unsubscribe();
  }
}
