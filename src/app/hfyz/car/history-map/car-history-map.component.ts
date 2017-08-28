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
  realTimeDataTOP10 = [];
  realTimeDataAlarmTOP10 = [];

  licenseNo: string;
  startDate: any;
  endDate: any;
  zh = zh;

  maplet: any;
  points: any[];



  constructor(private _toastr: ToastsManager
    , private _regularService: RegularService
    , private datePipe: DatePipe
    , private _eventBuservice: EventBuservice
    , private _ownerService: OwnerIdentityService
    , private _carService: CarService
    , private _mapService: MapService) {
    this.licenseNo = '';
    const current: any = new Date();
    this.startDate = null;
    this.endDate = null;
    this.points = [{
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35566,39.93218',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:37:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35666,39.93218',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 320,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:38:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35766,39.93218',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 0,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 1
    }, {
      'dateStr': '2017-06-30 07:39:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35816,39.93218',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 10,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 1
    }, {
      'dateStr': '2017-06-30 07:40:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35966,39.93218',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 30,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:41:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.36166,39.93218',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 100,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:42:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.36267,39.93218',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:43:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.36467,39.93218',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:44:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.36568,39.93218',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:45:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.36667,39.93218',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:46:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.37168,39.93218',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 100,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 1
    }];
  }

  ngOnInit() {
    this.maplet = new Maplet('historyMap')
    mianMapObject.initMap(this.maplet, 'historyMap');
  }

  search() {
    if (this.validate()) {
      this.realTimeDataTOP10 = this._mapService.getHistoryData(this.licenseNo);
      this.realTimeDataAlarmTOP10 = this._mapService.getHistoryAlarmData(this.licenseNo);
      this.showPath();
    }
  }

  showPath() {
    for (let i = 0; i < this.points.length; i++) {
      const pointData = this.points[i];
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
