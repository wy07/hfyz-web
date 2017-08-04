import { DatePipe } from '@angular/common';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MapService {
  change: EventEmitter<any>;

  constructor(private datePipe: DatePipe) {
    this.change = new EventEmitter();
  }

//   const points = [{
//             'dateStr': '2017-06-30 07:36:11',
//             'plateColor': 2,
//             'plateNo': '皖A35898',
//             'posEncrypt': 0,
//             'geoPoint': '116.35566,39.93218',
//             'gpsSpeed': 60,
//             'totalMileage': 1,
//             'recSpeed': 60,
//             'direction': 350,
//             'altitude': 0,
//             'vehicleState': 3,
//             'alarmState': 0
//         }, {
//             'dateStr': '2017-06-30 07:37:11',
//             'plateColor': 2,
//             'plateNo': '皖A35898',
//             'posEncrypt': 0,
//             'geoPoint': '116.35666,39.93218',
//             'gpsSpeed': 60,
//             'totalMileage': 1,
//             'recSpeed': 60,
//             'direction': 320,
//             'altitude': 0,
//             'vehicleState': 3,
//             'alarmState': 0
//         }, {
//             'dateStr': '2017-06-30 07:38:11',
//             'plateColor': 2,
//             'plateNo': '皖A35898',
//             'posEncrypt': 0,
//             'geoPoint': '116.35766,39.93218',
//             'gpsSpeed': 60,
//             'totalMileage': 1,
//             'recSpeed': 60,
//             'direction': 0,
//             'altitude': 0,
//             'vehicleState': 3,
//             'alarmState': 1
//         }, {
//             'dateStr': '2017-06-30 07:39:11',
//             'plateColor': 2,
//             'plateNo': '皖A35898',
//             'posEncrypt': 0,
//             'geoPoint': '116.35816,39.93218',
//             'gpsSpeed': 60,
//             'totalMileage': 1,
//             'recSpeed': 60,
//             'direction': 10,
//             'altitude': 0,
//             'vehicleState': 3,
//             'alarmState': 1
//         }, {
//             'dateStr': '2017-06-30 07:40:11',
//             'plateColor': 2,
//             'plateNo': '皖A35898',
//             'posEncrypt': 0,
//             'geoPoint': '116.35966,39.93218',
//             'gpsSpeed': 60,
//             'totalMileage': 1,
//             'recSpeed': 60,
//             'direction': 30,
//             'altitude': 0,
//             'vehicleState': 3,
//             'alarmState': 0
//         }, {
//             'dateStr': '2017-06-30 07:41:11',
//             'plateColor': 2,
//             'plateNo': '皖A35898',
//             'posEncrypt': 0,
//             'geoPoint': '116.36166,39.93218',
//             'gpsSpeed': 60,
//             'totalMileage': 1,
//             'recSpeed': 60,
//             'direction': 100,
//             'altitude': 0,
//             'vehicleState': 3,
//             'alarmState': 0
//         }, {
//             'dateStr': '2017-06-30 07:42:11',
//             'plateColor': 2,
//             'plateNo': '皖A35898',
//             'posEncrypt': 0,
//             'geoPoint': '116.36267,39.93218',
//             'gpsSpeed': 60,
//             'totalMileage': 1,
//             'recSpeed': 60,
//             'direction': 350,
//             'altitude': 0,
//             'vehicleState': 3,
//             'alarmState': 0
//         }, {
//             'dateStr': '2017-06-30 07:43:11',
//             'plateColor': 2,
//             'plateNo': '皖A35898',
//             'posEncrypt': 0,
//             'geoPoint': '116.36467,39.93218',
//             'gpsSpeed': 60,
//             'totalMileage': 1,
//             'recSpeed': 60,
//             'direction': 350,
//             'altitude': 0,
//             'vehicleState': 3,
//             'alarmState': 0
//         }, {
//             'dateStr': '2017-06-30 07:44:11',
//             'plateColor': 2,
//             'plateNo': '皖A35898',
//             'posEncrypt': 0,
//             'geoPoint': '116.36568,39.93218',
//             'gpsSpeed': 60,
//             'totalMileage': 1,
//             'recSpeed': 60,
//             'direction': 350,
//             'altitude': 0,
//             'vehicleState': 3,
//             'alarmState': 0
//         }, {
//             'dateStr': '2017-06-30 07:45:11',
//             'plateColor': 2,
//             'plateNo': '皖A35898',
//             'posEncrypt': 0,
//             'geoPoint': '116.36667,39.93218',
//             'gpsSpeed': 60,
//             'totalMileage': 1,
//             'recSpeed': 60,
//             'direction': 350,
//             'altitude': 0,
//             'vehicleState': 3,
//             'alarmState': 0
//         }, {
//             'dateStr': '2017-06-30 07:46:11',
//             'plateColor': 2,
//             'plateNo': '皖A35898',
//             'posEncrypt': 0,
//             'geoPoint': '116.37168,39.93218',
//             'gpsSpeed': 60,
//             'totalMileage': 1,
//             'recSpeed': 60,
//             'direction': 100,
//             'altitude': 0,
//             'vehicleState': 3,
//             'alarmState': 1
//         }];

  getHistoryData(plateNo) {
      const points = [];
      const num = 9;
      const dateTime = new Date().getTime();
        const date = this.datePipe.transform(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss');

    //   for (let i = 0; i < num; i++){
    //       const date = this.datePipe.transform(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss');
    //       const point = {
    //          dateStr:'',
    //          plateColor:i,
    //          plateNo: plateNo,
    //          posEncrypt:'',
    //          geoPoint: '',
    //          gpsSpeed: '',
    //          totalMileage: '',
    //          recSpeed: '',
    //          direction: '',
    //          altitude: '',
    //          vehicleState: '',
    //          alarmState: '',
    //       }
    //   }

    // return points
  }
};
