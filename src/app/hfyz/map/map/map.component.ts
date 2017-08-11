import { DatePipe } from '@angular/common';
import { zh } from './../../common/shared/zh';
import { NgRadio } from 'ng-radio';
import { EventBuservice } from './../../common/shared/eventbus.service';
import { Component, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
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
    oldRealTimeMonitorFrameNo: string;
    historyMapKey: string;
    historyMapFrameNo: string;
    realTimeDataTOP10 = [];
    realTimeMonitorTOP10 = [];
    startDate: any;
    endDate: any;
    zh = zh;

    constructor(private toastr: ToastsManager
        , private regularService: RegularService
        , private eventBuservice: EventBuservice
        , private datePipe: DatePipe
        , private radio: NgRadio
        , private mapService: MapService) {
        this.lng = 117.126826;
        this.lat = 31.852467;
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
        this.startDate = new Date();
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
                this.realTimeDataTOP10 = [];
                if (this.realTimeMapKey !== inputs.key) {
                    this.realTimeMapKey = inputs.key;
                    this.realTimeMapFrameNo = inputs.frameNo;
                }
            } else if (inputs.code === 'historyMap') {
                this.realTimeDataTOP10 = [];
                this.startDate = new Date(this.startDate.setHours(this.startDate.getHours() - 1));
                this.endDate = new Date();
                if (this.historyMapKey !== inputs.key) {
                    this.historyMapKey = inputs.key;
                    this.historyMapFrameNo = inputs.frameNo;
                }
            } else if (inputs.code === 'realTimeMonitorMap') {
                this.realTimeMonitorTOP10 = [];
                if (this.realTimeMonitorKey !== inputs.key) {
                    this.realTimeMonitorKey = inputs.key;
                    this.realTimeMonitorFrameNo = inputs.frameNo;
                }
            }

            console.log('===this.mapCode===' + this.mapCode);

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

    getDataTOP10() {
        this.realTimeDataTOP10 = this.mapService.getHistoryData(this.realTimeMapFrameNo);
        if (this.realTimeDataTOP10.length > 0) {
            const data = {
                'msg': {
                    'dateStr': this.realTimeDataTOP10[0].dateStr,
                    'plateColor': this.realTimeDataTOP10[0].plateColor,
                    'plateNo': this.realTimeMapFrameNo,
                    'posEncrypt': this.realTimeDataTOP10[0].posEncrypt,
                    'geoPoint': this.realTimeDataTOP10[0].geoPoint,
                    'gpsSpeed': this.realTimeDataTOP10[0].gpsSpeed,
                    'totalMileage': this.realTimeDataTOP10[0].totalMileage,
                    'recSpeed': this.realTimeDataTOP10[0].recSpeed,
                    'direction': this.realTimeDataTOP10[0].direction,
                    'altitude': this.realTimeDataTOP10[0].altitude,
                    'vehicleState': this.realTimeDataTOP10[0].vehicleState,
                    'alarmState': this.realTimeDataTOP10[0].alarmState
                }
            };
            this.getRealTimeGnssDataByEventBus(data, 'histroyData')
        }
    }

    registerHandler() {
        const $this = this;
        this.eventBuservice.carRealTimeRegisterHandler(this.realTimeMapFrameNo, res => {
            $this.getRealTimeGnssDataByEventBus(res, 'realTimeData');
        })
    }

    registerRealTimeMonitorHandler() {
        const $this = this;
        this.eventBuservice.carRealTimeRegisterHandler(this.realTimeMonitorFrameNo, res => {
            $this.getRealTimeMonitorGnssData(res, 'realTimeData');
        })
    }

    getRealTimeMap() {
        this.eventBuservice.closeEventBus();
        if (this.realTimeMapFrameNo) {
            this.realTimeDataTOP10 = this.mapService.getHistoryData(this.realTimeMapFrameNo);
            console.log('=====realTimeDataTOP10=====' + JSON.stringify(this.realTimeDataTOP10));
            this.getDataTOP10();
            this.registerHandler();
        } else {
            this.toastr.error('请输入车牌号');
        }
    }

    getRealTimeMonitorMap() {
        this.eventBuservice.closeEventBus();
        if (this.realTimeMonitorFrameNo) {
            this.registerRealTimeMonitorHandler();
        } else {
            this.toastr.error('请输入车牌号');
        }
    }

    getHistoryMap() {
        if (this.validationHistoryMap()) {
            this.realTimeDataTOP10 = this.mapService.getHistoryData(this.historyMapFrameNo);
            this.showPath();
        }
    }

    validationHistoryMap() {
        const startDate = new Date(this.startDate).getTime();
        const endDate = new Date(this.endDate).getTime();
        if (!this.historyMapFrameNo) {
            this.toastr.error('请输入车牌号');
            return false;
        }
        if (!this.startDate) {
            this.toastr.error('请选择开始时间');
            return false;
        }
        if (!this.endDate) {
            this.toastr.error('请选择结束时间');
            return false;
        }
        if (endDate < startDate) {
            this.toastr.error('查询结束时间不能小于开始时间.');
            return false;
        }
        return true
    }



    showPath() {
        for (const point of this.points) {
            mapObject.historyPoints(point.geoPoint, point.alarmState, GnssData.getRealTimeInfo(point));
        }
    }

    getRealTimeGnssDataByEventBus(data, type) {
        this.realTimeGnssData = {
            'dateStr': data.msg.dateStr,
            'plateColor': data.msg.plateColor,
            'plateNo': this.realTimeMapFrameNo,
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
        console.log('=====this.realTimeGnssData======' + JSON.stringify(this.realTimeGnssData));
        if (type !== 'histroyData') {
            this.processingDataList(this.realTimeDataTOP10, this.realTimeGnssData)
        }
        mapObject.realTimePoint(this.realTimeGnssData.geoPoint,
            GnssData.getRealTimeInfo(this.realTimeGnssData),
            this.realTimeGnssData.direction);
    }

    getRealTimeMonitorGnssData(data, type) {
        this.realTimeMonitorGnssData = {
            'dateStr': data.msg.dateStr,
            'plateColor': data.msg.plateColor,
            'plateNo': this.realTimeMapFrameNo,
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
        if (type !== 'histroyData') {
            console.log('=====this.realTimeMonitorGnssData======' + JSON.stringify(this.realTimeMonitorGnssData));
            this.processingDataList(this.realTimeMonitorTOP10, this.realTimeMonitorGnssData)
        }
        mapObject.realTimeMonitorPoint(this.realTimeMonitorGnssData.geoPoint,
            GnssData.getRealTimeMonitorInfo(this.realTimeMonitorGnssData),
            this.realTimeMonitorGnssData.direction);
    }

    processingDataList(list: any[], data) {
        if (list.length > 9) {
            list.splice(0, 1);
            list.push(data);
        } else {
            list.push(data);
        }
    }

}
