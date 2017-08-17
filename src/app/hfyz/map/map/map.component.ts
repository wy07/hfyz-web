import { DatePipe } from '@angular/common';
import { zh } from './../../common/shared/zh';
import { NgRadio } from 'ng-radio';
import { EventBuservice } from './../../common/shared/eventbus.service';
import { Component, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import { GnssData } from '../../common/shared/gnss-data';
import { MapService } from '../shared/map.service';
import { ToastsManager } from 'ng2-toastr';
import { RegularService } from '../../common/shared/regular.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { OwnerIdentityService } from '../../owner-identity/shared/owner-identity.service';
import { CarService } from '../../car/shared/car.service';
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
    companyName: string;

    companys: SelectItem[];
    company: string;
    carsGroupByCompany: any;

    cars: SelectItem[];
    selectCars: any[];


    currentRealTimeAccordion: string;

    constructor(private toastr: ToastsManager
        , private regularService: RegularService
        , private eventBuservice: EventBuservice
        , private datePipe: DatePipe
        , private radio: NgRadio
        , private mapService: MapService
        , private _ownerService: OwnerIdentityService
        , private _carService: CarService) {
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
        this.companyName = sessionStorage.getItem('companyName')
        console.log('===companyName====' + sessionStorage.getItem('companyName'))


        this.onRealTimeAccordion('singleCar');

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
                if (inputs.currentRealTimeAccordion === 'singleCar') {
                    this.onRealTimeAccordion('singleCar');
                    this.clearCompanysAndCars();
                    if (this.realTimeMapKey !== inputs.key) {
                        this.realTimeMapKey = inputs.key;
                        this.realTimeMapFrameNo = inputs.frameNo;
                    }
                } else {
                    this.onRealTimeAccordion('multipleCar');
                    for (const item of this.selectCars) {
                        this.addCar(item, false);
                    }
                }
                const companyCode = sessionStorage.getItem('companyCode');
                if (companyCode !== 'null') {
                    this.getCompanyCars(companyCode)
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

        this.companys = [];
        this.carsGroupByCompany = {};
        // for (let i = 0; i < 1000; i++) {
        //     this.companys.push({label: `企业${i}`, value: `C00000000${i}`});
        // }

        this.cars = [];
        this.selectCars = [];
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

    getDataTOP10(list, type) {
        if (list.length > 0) {
            const data = {
                'msg': {
                    'dateStr': list[0].dateStr,
                    'plateColor': list[0].plateColor,
                    'plateNo': this.realTimeMapFrameNo,
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
            if (type === 'realTimeData') {
                this.getRealTimeGnssDataByEventBus(data, 'histroyData');
            } else {
                this.getRealTimeMonitorGnssData(data, 'histroyData');
            }
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
            $this.getRealTimeMonitorGnssData(res, 'realTimeMonitor');
        })
    }

    getRealTimeMap() {
        this.clearCompanysAndCars();
        this.eventBuservice.closeEventBus();
        if (this.realTimeMapFrameNo) {
            this.realTimeDataTOP10 = this.mapService.getHistoryData(this.realTimeMapFrameNo);
            console.log('=====realTimeDataTOP10=====' + JSON.stringify(this.realTimeDataTOP10));
            this.getDataTOP10(this.realTimeDataTOP10, 'realTimeData');
            this.registerHandler();
        } else {
            this.toastr.error('请输入车牌号');
        }
    }

    getRealTimeMonitorMap() {
        this.eventBuservice.closeEventBus();
        if (this.realTimeMonitorFrameNo) {
            this.realTimeMonitorTOP10 = this.mapService.getHistoryData(this.realTimeMapFrameNo);
            this.getDataTOP10(this.realTimeMonitorTOP10, 'realTimeMonitor');
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
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            mapObject.historyPoints(point.geoPoint, point.alarmState, GnssData.getRealTimeInfo(point));
            if (i === 0) {
                const val = point.geoPoint.split(',');
                mapObject.resetCenter(val[0], val[1]);
            }
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

    onCombineQuery() {
        mapObject.clean();
        for (let i = 0; i < 5; i++) {
            this.lng += 0.001;
            this.lat += 0.001;
            if (i === 0) {
                mapObject.resetCenter(this.lng, this.lat)
            }
            mapObject.combineQueryPoint(`${this.lng},${this.lat}`,
                i,
                `${this.lng},${this.lat}==${i}`,
                23);
        }
        let lngaa = 117.126826;
        let lataa = 31.852467;

        setInterval(function () {
            lngaa -= 0.001;
            lataa += 0.001;
            mapObject.combineQueryPoint(`${lngaa},${lataa}`,
                0,
                `${lngaa},${lataa}==${0}`,
                50);
        }, 2000)

    }

    onRealTimeAccordion(currentAccordion) {
        this.currentRealTimeAccordion = currentAccordion;

        if (currentAccordion === 'multipleCar') {
            if (this.companys.length === 0) {
                this.getCompanys();
            }
        }
    }

    getCompanys() {
        this.companys = [];
        this.carsGroupByCompany = {};
        this._ownerService.all().subscribe(
            res => {
                for (const item of res.companys) {
                    this.companys.push({ label: item.name, value: item.code });
                }
            }
        )
    }

    companySelectChange(event) {
        this.cars = [];
        if (this.regularService.isBlank(event.value)) {
            this.cars = [];
            return
        }

        if (this.carsGroupByCompany.hasOwnProperty(event.value)) {

            for (const item of this.carsGroupByCompany[event.value]) {
                this.cars.push({ label: `${item.licenseNo}(${item.carPlateColor})`, value: item.licenseNo });
            }
        } else {
            this.getCompanyCars(event.value)
        }

    }

    getCompanyCars(companyCode) {
        this._carService.getCompanyCars(companyCode).subscribe(
            res => {
                for (const item of res.cars) {
                    this.cars.push({ label: `${item.licenseNo}(${item.carPlateColor})`, value: item.licenseNo });
                }
            }
        )
    }

    carSelected(licenseNo) {
        if (this.selectCars.length === 0) {
            this.clearListAndFrameNo();
        }
        return this.selectCars.findIndex(x => x.value === licenseNo) > -1;
    }

    carSelectChange(event, item) {
        const carIndex = this.selectCars.findIndex(x => x.value === event.target.value);
        if (!event.target.checked) {
            if (carIndex > -1) {
                console.log('====this.realTimeDataTOP10===1==' + JSON.stringify(this.realTimeDataTOP10));
                this.realTimeDataTOP10 = this.realTimeDataTOP10.filter(res => res.plateNo !== item.value);
                console.log('=====realTimeDataTOP10===2=' + JSON.stringify(this.realTimeDataTOP10))
                this.eventBuservice.unregisterHandler(item.value);
                mapObject.removecombineQueryPoint(item.value);
                this.selectCars.splice(carIndex, 1);
            }
        }

        if (carIndex < 0) {
            this.addCar(item, true);
        }
    }

    addCar(item, isPush) {
        if (isPush) {
            this.selectCars.push(item);
        }
        this.lng += 0.001;
        this.lat += 0.001;
        const point: any = {
            dateStr: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            plateColor: 1,
            plateNo: item.value,
            posEncrypt: 0,
            geoPoint: `${this.lng},${this.lat}`,
            gpsSpeed: '60',
            totalMileage: 1,
            recSpeed: 60,
            direction: 100,
            altitude: 0,
            vehicleState: 3,
            alarmState: 1
        }
        this.realTimeDataTOP10.push(point)
        mapObject.resetCenter(this.lng, this.lat)
        mapObject.combineQueryPoint(`${this.lng},${this.lat}`,
            item.value,
            GnssData.getRealTimeInfo(point),
            23);
    }

    removeCar(licenseNo) {
        const carIndex = this.selectCars.findIndex(x => x.value === licenseNo);
        if (carIndex > -1) {
            mapObject.removecombineQueryPoint(licenseNo);
            this.selectCars.splice(carIndex, 1);
        }
    }

    showCar(licenseNo) {
        mapObject.showCombinePoint(licenseNo);
    }

    clearCompanysAndCars() {
        this.eventBuservice.closeEventBus();
        this.companys = [];
        this.company = '';
        this.carsGroupByCompany = {};
        this.cars = [];
        this.selectCars = [];
        this.realTimeDataTOP10 = [];
        mapObject.clean();
    }

    clearListAndFrameNo() {
        this.eventBuservice.closeEventBus();
        this.realTimeDataTOP10 = [];
        this.realTimeMonitorTOP10 = [];
        this.realTimeMapFrameNo = '';
        this.realTimeMonitorFrameNo = '';
        mapObject.clean();
    }

}
