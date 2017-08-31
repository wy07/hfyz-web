import { TdLoadingService } from '@covalent/core';
import { MapService } from './../../map/shared/map.service';
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

@Component({
  selector: 'app-car-history-map',
  templateUrl: './car-history-map.component.html',
  styleUrls: ['./car-history-map.component.css']
})
export class CarHistoryMapComponent implements OnInit {
  historyLocations = [];
  warnings = [];

  licenseNo: string;
  startDate: any;
  endDate: any;
  zh = zh;

  maplet: any;

  constructor(private _toastr: ToastsManager
    , private _regularService: RegularService
    , private datePipe: DatePipe
    , private _eventBuservice: EventBuservice
    , private _ownerService: OwnerIdentityService
    , private _carService: CarService
    , private _mapService: MapService
    , private _loadingService: TdLoadingService) {
    this.licenseNo = '';
    const current: any = new Date();
    this.startDate = null;
    this.endDate = null;
  }

  ngOnInit() {
    this.maplet = new Maplet('historyMap')
    mianMapObject.initMap(this.maplet, 'historyMap');
  }

  search() {
    if (!this.validate()) {
      return false;
    }
    this._loadingService.register();
    this._carService.getHistoryInfo(this.licenseNo
      , this.datePipe.transform(this.startDate, 'yyyy-MM-dd HH:mm')
      , this.datePipe.transform(this.endDate, 'yyyy-MM-dd HH:mm')).subscribe(
      res => {
        this._loadingService.resolve();
        this.historyLocations = res.historyLocations;
        this.warnings = res.warnings;
        this.showPath();
      }
      );
  }

  showPath() {
    for (let i = 0; i < this.historyLocations.length; i++) {
      const pointData = this.historyLocations[i];
      const point = new MPoint(pointData.geoPoint);
      const marker = new MMarker(
        point,
        new MIcon(pointData.alarmState === 0 ? 'assets/images/green.png' : 'assets/images/red.png', 16, 16),
        new MInfoWindow('详细信息', GnssData.getRealTimeInfo(pointData))
      );
      this.maplet.addOverlay(marker);
      if (i === 0) {
        const val = pointData.geoPoint.split(',');
        mianMapObject.resetCenter(this.maplet, val[0], val[1])
      }
    }
  }

  validate() {
    const startDate = new Date(this.startDate).getTime();
    const endDate = new Date(this.endDate).getTime();
    if (!this.licenseNo) {
      this._toastr.error('请输入车牌号');
      return false;
    }
    if (!this.startDate) {
      this._toastr.error('请选择开始时间');
      return false;
    }
    if (!this.endDate) {
      this._toastr.error('请选择结束时间');
      return false;
    }
    if (endDate < startDate) {
      this._toastr.error('查询结束时间不能小于开始时间.');
      return false;
    }
    return true
  }

}
