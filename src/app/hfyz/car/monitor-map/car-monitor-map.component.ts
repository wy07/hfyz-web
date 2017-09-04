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
  selector: 'app-car-monitor-map',
  templateUrl: './car-monitor-map.component.html',
  styleUrls: ['./car-monitor-map.component.css']
})
export class CarMonitorMapComponent implements OnInit {
  licenseNo: string;
  realTimeMonitorGnssData: GnssData;
  historyLocations = [];
  warnings = [];
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
    this.realTimeMonitorGnssData = null;
  }

  ngOnInit() {
    this.maplet = new Maplet('monitorMap')
    mianMapObject.initMap(this.maplet, 'monitorMap');
  }

  search() {
    this._eventBuservice.closeEventBus('monitor');
    if (!this.licenseNo) {
      this._toastr.error('请输入车牌号');
      return false;
    }

    this._loadingService.register();
    this._carService.getWarningAndHistorys(this.licenseNo, 10).subscribe(
      res => {
        this._loadingService.resolve();
        this.historyLocations = res.historyLocations;
        this.warnings = res.warnings;
        this.initCar(this.historyLocations);
        this.registerHandler();
      }
    );
  }

  initCar(list) {
    if (list.length > 0) {
      const data = {
        'dateStr': list[0].dateStr,
        'plateColor': list[0].plateColor,
        'plateNo': list[0].plateNo,
        'posEncrypt': list[0].posEncrypt,
        'geoPoint': list[0].geoPoint,
        'gpsSpeed': list[0].gpsSpeed,
        'totalMileage': list[0].totalMileage,
        'recSpeed': list[0].recSpeed,
        'direction': list[0].direction,
        'altitude': list[0].altitude,
        'vehicleState': list[0].vehicleState,
        'alarmState': list[0].alarmState
      };
      this.getRealTimeMonitorGnssData(data, 'histroyData');
    }
  }

  getRealTimeMonitorGnssData(data, type) {
    this.realTimeMonitorGnssData = {
      'dateStr': data.dateStr,
      'plateColor': data.plateColor,
      'plateNo': data.plateNo,
      'posEncrypt': data.posEncrypt,
      'geoPoint': data.geoPoint,
      'gpsSpeed': data.gpsSpeed,
      'totalMileage': data.totalMileage,
      'recSpeed': data.recSpeed,
      'direction': data.direction,
      'altitude': data.altitude,
      'vehicleState': data.vehicleState,
      'alarmState': data.alarmState
    };
    if (type !== 'histroyData') {
      this._mapService.processingDataList(this.historyLocations, this.realTimeMonitorGnssData)
    }
    this.addPoint(this.realTimeMonitorGnssData.geoPoint,
      GnssData.getRealTimeMonitorInfo(this.realTimeMonitorGnssData),
      this.realTimeMonitorGnssData.direction);
  }

  addPoint(geoPoint, info, direction) {
    this.maplet.clearOverlays(true);
    const point = new MPoint(geoPoint);
    const marker = new MMarker(
      point,
      new MIcon('<img class="con" id="icon_realTimeMonitor" src="assets/images/car0.png"  width="24px" height="48px"/>', 24, 48),
      new MInfoWindow('详细信息', info)
    );
    this.maplet.addOverlay(marker);
    marker.openInfoWindow();
    mianMapObject.showMonitorContent();
    setTimeout(mianMapObject.setDirection('icon_realTimeMonitor', direction), 1000);
  }

  registerHandler() {
    const $this = this;
    this._eventBuservice.carRealTimeRegisterHandler('monitor', this.licenseNo, res => {
      $this.getRealTimeMonitorGnssData(res.msg, 'realTimeMonitorData');
    })
  }
}
