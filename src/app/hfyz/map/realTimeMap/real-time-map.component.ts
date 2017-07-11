import { Component, OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';
import { GnssData } from '../../common/shared/gnss-data';
import {MapService} from "../shared/map.service";
// declare var minemap: any;

declare var mapObject: any;

@Component({
  selector: 'app-map',
  templateUrl: 'real-time-map.component.html',
  styleUrls: ['real-time-map.component.css']
})
export class RealTimeMapComponent implements OnInit,OnDestroy {
  realTimePoint: any;
  realTimeGnssData: GnssData;
  timer: any;
  lng: number;
  lat: number;
  points: any[];
  mapCode:string;


  constructor(private mapService:MapService) {
    this.lng = 116.35566;
    this.lat = 39.93218;
    this.realTimeGnssData = null;
    this.mapCode=null;
    this.mapService.change.subscribe((value:string)=>{
      console.log("-----change.subscribe")
      console.log("-----change.subscribe:"+value)
      clearTimeout(this.timer);
      if(this.mapCode){
        this.mapCode = value;
        this.initMap();
      }else{
        this.mapCode = value;
      }
    })

  }

  ngOnInit() {
    mapObject.initMap('map');
    if(this.mapCode){
      this.initMap();
    }
  }

  initMap(){
    console.log(`mapCode:${this.mapCode}`);
    mapObject.reload();
    if(this.mapCode=='realTimeMap'){
      console.log("in realTimeMap")
      this.initRealTimeMap();
    }else if(this.mapCode=='historyMap'){
      console.log("in historyMap")
      this.initHistoryMap();
    }else if(this.mapCode=='otherMap'){
      console.log("in otherMap")
      mapObject.clean();
    }
  }

  ngOnDestroy() {
    console.log("-----OnDestroy");
    clearTimeout(this.timer);
  }

  initRealTimeMap() {
    mapObject.clean();
    let $this = this;
    $this.getRealTimeGnssData();
    this.timer = setInterval(function () {
      $this.getRealTimeGnssData();
    }, 1000)
  }

  initHistoryMap() {
    clearTimeout(this.timer);
    mapObject.clean();
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
      'direction': 350,
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
      'direction': 350,
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
      'direction': 350,
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
      'direction': 350,
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
      'direction': 350,
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
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 1
    }];
    this.showPath();
  }

  showPath() {
    for (let point of this.points) {
      mapObject.historyPoints(point.geoPoint, point.alarmState, GnssData.getRealTimeInfo(point));
    }
  }

  getRealTimeGnssData() {
    this.lng += 0.001;
    this.realTimeGnssData = {
      'dateStr': '2017-06-30 07:36:11',
      'plateColor': 2,
      'plateNo': '皖A35898',
      'posEncrypt': 0,
      'geoPoint': `${this.lng},${this.lat}`,
      'gpsSpeed': 60,
      'totalMileage': 1,
      'recSpeed': 60,
      'direction': 350,
      'altitude': 0,
      'vehicleState': 3,
      'alarmState': 0
    };
    mapObject.realTimePoint(this.realTimeGnssData.geoPoint, GnssData.getRealTimeInfo(this.realTimeGnssData));
  }

}
