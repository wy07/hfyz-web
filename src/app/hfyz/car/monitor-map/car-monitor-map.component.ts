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
  realTimeTOP10 = [];
  alarmTOP10 = [];
  maplet: any;

  constructor(private _toastr: ToastsManager
    , private _regularService: RegularService
    , private datePipe: DatePipe
    , private _eventBuservice: EventBuservice
    , private _ownerService: OwnerIdentityService
    , private _carService: CarService
    , private _mapService: MapService) {
    this.licenseNo = '';
    this.realTimeMonitorGnssData = null;
  }

  ngOnInit() {
    this.maplet = new Maplet('monitorMap')
    mianMapObject.initMap(this.maplet, 'monitorMap');
  }

  search() {
    this._eventBuservice.closeEventBus();
    if (this.licenseNo) {
      this.realTimeTOP10 = this._mapService.getHistoryData(this.licenseNo);
      this.alarmTOP10 = this._mapService.getHistoryAlarmData(this.licenseNo);
      this.getDataTOP10(this.realTimeTOP10);
      this.registerHandler();
    } else {
      this._toastr.error('请输入车牌号');
    }
  }

  getDataTOP10(list) {
    if (list.length > 0) {
      const data = {
        'msg': {
          'dateStr': list[0].dateStr,
          'plateColor': list[0].plateColor,
          'plateNo': this.licenseNo,
          'posEncrypt': list[0].posEncrypt,
          'geoPoint': list[0].geoPoint,
          'gpsSpeed': list[0].gpsSpeed,
          'totalMileage': list[0].totalMileage,
          'recSpeed': list[0].recSpeed,
          'direction': list[0].direction,
          'altitude': list[0].altitude,
          'vehicleState': list[0].vehicleState,
          'alarmState': list[0].alarmState
        }
      };
      this.getRealTimeMonitorGnssData(data);
    }
  }

  getRealTimeMonitorGnssData(data) {
    this.realTimeMonitorGnssData = {
      'dateStr': data.msg.dateStr,
      'plateColor': data.msg.plateColor,
      'plateNo': this.licenseNo,
      'posEncrypt': data.msg.posEncrypt,
      'geoPoint': data.msg.geoPoint,
      'gpsSpeed': data.msg.gpsSpeed,
      'totalMileage': data.msg.totalMileage,
      'recSpeed': data.msg.recSpeed,
      'direction': data.msg.direction,
      'altitude': data.msg.altitude,
      'vehicleState': data.msg.vehicleState,
      'alarmState': data.msg.alarmState
    };

    this._mapService.processingDataList(this.realTimeTOP10, this.realTimeMonitorGnssData)
    this.addSingleCarPoint(this.realTimeMonitorGnssData.geoPoint,
      GnssData.getRealTimeMonitorInfo(this.realTimeMonitorGnssData),
      this.realTimeMonitorGnssData.direction);
  }

  addSingleCarPoint(geoPoint, info, direction) {
    const point = new MPoint(geoPoint);
    const marker = new MMarker(
      point,
      new MIcon('<img class="con" id="icon_realTimeMonitor" src="assets/images/car0.png"  width="24px" height="48px"/>', 24, 48),
      new MInfoWindow('详细信息', info)
    );
    this.maplet.addOverlay(marker);
    marker.openInfoWindow();
    mianMapObject.showMonitorContent();
    mianMapObject.setDirection('icon_realTime', direction);
  }

  registerHandler() {
    const $this = this;
    this._eventBuservice.carRealTimeRegisterHandler(this.licenseNo, res => {
      $this.getRealTimeMonitorGnssData(res);
    })
  }

}
