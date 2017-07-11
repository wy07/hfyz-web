import { Component, OnInit } from '@angular/core';
import { GnssData } from '../../common/shared/gnss-data';
// declare var minemap: any;

declare var mapObject: any;
declare var oo: any;
declare var historyMap: any;
// declare var maplet: any;
declare var MStandardControl: any;
declare var MPoint: any;
declare var MMarker: any;
declare var MIcon: any;
declare var MInfoWindow: any;
declare var MLabel: any;
declare var MBrush: any;
declare var MPolyline: any;

@Component({
  moduleId: module.id,
  selector: 'app-h-map',
  templateUrl: 'history-map.component.html',
  styleUrls: ['history-map.component.css']
})
export class HistoryMapComponent implements OnInit {
  datas: any;
  n: number; // 数组下标
  points: any[];
  realTimePoint: any;
  realTimeGnssData: GnssData;

  constructor() {
    this.n = 0;
    this.points = [];
  }

  ngOnInit() {
    mapObject.initHistoryMap('hismap');
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
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35566,39.93213',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35566,39.93206',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 1
    }, {
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35566,39.93202',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 1
    }, {
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35566,39.93198',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35566,39.93193',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35567,39.93189',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35567,39.93183',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35568,39.93178',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35567,39.93176',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    }, {
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': '116.35568,39.93168',
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 1
    }]
    this.showPath();
  }


  showPath() {
    for (let point of this.points) {
      console.log(point.geoPoint);
      mapObject.historyPoints(point.geoPoint, point.alarmState, GnssData.getRealTimeInfo(point));
    }
  }
  //
  // getRealTimeGnssData(n) {
  //   console.log('------------in getRealTimeGnssData');
  //
  //   if (n >= this.datas.length) {
  //     return false;
  //   }
  //
  //
  //
  //   console.log('----------realTimeGnssData.geoPoint' + this.realTimeGnssData.geoPoint);
  //   mapObject.realTimePoint(this.realTimeGnssData.geoPoint,GnssData.getRealTimeInfo(this.realTimeGnssData));
  //   // if(this.realTimePoint){
  //   //   console.log('----------in');
  //   //   maplet.clearOverlays(true);
  //   //   // maplet.removeOverlay(this.realTimePoint,true);//从地图中删除叠加物。
  //   // }
  //   // this.realTimePoint = new MPoint(realTimeGnssData.geoPoint);
  //   // let marker = new MMarker(
  //   //   this.realTimePoint,
  //   //   new MIcon('assets/images/logo.png', 32, 32),
  //   //   new MInfoWindow('test', '车辆信息')
  //   // ).openInfoWindow();
  //   // maplet.addOverlay(marker);
  // }

}
