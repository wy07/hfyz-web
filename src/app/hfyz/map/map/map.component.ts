import { Component, OnInit, OnDestroy } from '@angular/core';
import { GnssData } from '../../common/shared/gnss-data';
import { MapService } from '../shared/map.service';
import { ToastsManager } from 'ng2-toastr';
import { RegularService } from '../../common/shared/regular.service';
declare var mapObject: any;

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  realTimePoint: any;
  realTimeGnssData: GnssData;
  realTimeMonitorGnssData: GnssData;
  timer: any;
  lng: number;
  lat: number;
  points: any[];
  mapCode: string;
  directions: any[];
  directionIndex: number;

  realTimeMapKey: string;
  realTimeMapFrameNo: string;
  realTimeMonitorKey: string;
  realTimeMonitorFrameNo: string;
  historyMapKey: string;
  historyMapFrameNo: string;


  constructor(private toastr: ToastsManager
    , private regularService: RegularService
    , private mapService: MapService) {
    this.lng = 116.35566;
    this.lat = 39.93218;
    this.realTimeGnssData = null;
    this.realTimeMonitorGnssData = null;
    this.mapCode = null;
    this.realTimeMapKey = '';
    this.realTimeMapFrameNo = '';
    this.historyMapKey = '';
    this.historyMapFrameNo = '';
    this.realTimeMonitorKey = '';
    this.realTimeMonitorFrameNo = '';
    this.directions = [10, 46, 80, 100, 138, 160, 250, 320, 360];
    this.directionIndex = 0;
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
    this.mapService.change.subscribe((inputs: any) => {
      clearTimeout(this.timer);
      mapObject.clean();
      if (inputs.code === 'realTimeMap') {
        if (this.realTimeMapKey !== inputs.key) {
          this.realTimeMapKey = inputs.key;
          this.realTimeMapFrameNo = inputs.frameNo;
        }
      } else if (inputs.code === 'historyMap') {
        if (this.historyMapKey !== inputs.key) {
          this.historyMapKey = inputs.key;
          this.historyMapFrameNo = inputs.frameNo;
        }
      } else if (inputs.code === 'realTimeMonitorMap') {
        if (this.realTimeMonitorKey !== inputs.key) {
          this.realTimeMonitorKey = inputs.key;
          this.realTimeMonitorFrameNo = inputs.frameNo;
        }
      }

      if (this.mapCode) {
        this.mapCode = inputs.code;
        this.initMap();
      } else {
        this.mapCode = inputs.code;
      }
    })
  }

  ngOnInit() {
    mapObject.initMap('map');
    if (this.mapCode) {
      this.initMap();
    }
  }

  initMap() {
    if (this.mapCode === 'realTimeMap') {
      if (this.realTimeMapFrameNo) {
        this.getRealTimeMap();
      }
    } else if (this.mapCode === 'historyMap') {
      if (this.historyMapFrameNo) {
        this.getHistoryMap();
      }
    } else if (this.mapCode === 'realTimeMonitorMap') {
      if (this.realTimeMonitorFrameNo) {
        this.getRealTimeMonitorMap();
      }
    } else {
      mapObject.clean();
    }
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }

  getRealTimeMap() {
    if (this.realTimeMapFrameNo) {
      clearTimeout(this.timer);
      this.lng = 116.35566;
      this.lat = 39.93218;
      let $this = this;
      $this.getRealTimeGnssData();
      this.timer = setInterval(function () {
        $this.getRealTimeGnssData();
      }, 2000)
    } else {
      this.toastr.error('请输入车牌号');
    }
  }

  getRealTimeMonitorMap() {
    if (this.realTimeMonitorFrameNo) {
      clearTimeout(this.timer);
      this.lng = 116.35566;
      this.lat = 39.93218;
      let $this = this;
      $this.getRealTimeMonitorGnssData();
      this.timer = setInterval(function () {
        $this.getRealTimeMonitorGnssData();
      }, 2000)
    } else {
      this.toastr.error('请输入车牌号');
    }
  }

  getHistoryMap() {
    if (this.historyMapFrameNo) {
      this.showPath();
    } else {
      this.toastr.error('请输入车牌号');
    }
  }



  showPath() {
    for (let point of this.points) {
      mapObject.historyPoints(point.geoPoint, point.alarmState, GnssData.getRealTimeInfo(point));
    }
  }

  getRealTimeGnssData() {
    this.lng += 0.001;
    this.directionIndex += 1;
    this.realTimeGnssData = {
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': `${this.lng},${this.lat}`,
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': this.directions[this.directionIndex % 8],
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    };
    mapObject.realTimePoint(this.realTimeGnssData.geoPoint, GnssData.getRealTimeInfo(this.realTimeGnssData), this.realTimeGnssData.direction);
  }

  getRealTimeMonitorGnssData() {
    this.lng += 0.001;
    this.directionIndex += 1;
    this.realTimeMonitorGnssData = {
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': `${this.lng},${this.lat}`,
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': this.directions[this.directionIndex % 8],
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    };
    mapObject.realTimeMonitorPoint(this.realTimeMonitorGnssData.geoPoint, GnssData.getRealTimeMonitorInfo(this.realTimeMonitorGnssData), this.realTimeMonitorGnssData.direction);
  }
}
