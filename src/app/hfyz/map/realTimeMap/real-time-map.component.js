"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var gnss_data_1 = require("../../common/shared/gnss-data");
var RealTimeMapComponent = (function () {
    function RealTimeMapComponent(toastr, regularService, mapService) {
        var _this = this;
        this.toastr = toastr;
        this.regularService = regularService;
        this.mapService = mapService;
        this.lng = 116.35566;
        this.lat = 39.93218;
        this.realTimeGnssData = null;
        this.mapCode = null;
        this.realTimeMapKey = '';
        this.realTimeMapFrameNo = '';
        this.historyMapKey = '';
        this.historyMapFrameNo = '';
        this.mapService.change.subscribe(function (inputs) {
            clearTimeout(_this.timer);
            mapObject.clean();
            if (inputs.code === 'realTimeMap') {
                if (_this.realTimeMapKey != inputs.key) {
                    _this.realTimeMapKey = inputs.key;
                    _this.realTimeMapFrameNo = inputs.frameNo;
                }
            }
            else if (inputs.code === 'historyMap') {
                if (_this.realTimeMapKey != inputs.key) {
                    _this.realTimeMapKey = inputs.key;
                    _this.historyMapFrameNo = inputs.frameNo;
                }
            }
            if (_this.mapCode) {
                _this.mapCode = inputs.code;
                _this.initMap();
            }
            else {
                _this.mapCode = inputs.code;
            }
        });
    }
    RealTimeMapComponent.prototype.ngOnInit = function () {
        mapObject.initMap('map');
        if (this.mapCode) {
            this.initMap();
        }
    };
    RealTimeMapComponent.prototype.initMap = function () {
        if (this.mapCode == 'realTimeMap') {
            if (this.realTimeMapFrameNo) {
                this.getRealTimeMap();
            }
        }
        else if (this.mapCode == 'historyMap') {
            if (this.historyMapFrameNo) {
                this.getHistoryMap();
            }
        }
        else {
            mapObject.clean();
        }
    };
    RealTimeMapComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.timer);
    };
    RealTimeMapComponent.prototype.getRealTimeMap = function () {
        if (this.realTimeMapFrameNo) {
            var $this_1 = this;
            $this_1.getRealTimeGnssData();
            this.timer = setInterval(function () {
                $this_1.getRealTimeGnssData();
            }, 1000);
        }
        else {
            this.toastr.error("请输入车架号");
        }
    };
    RealTimeMapComponent.prototype.getHistoryMap = function () {
        if (this.historyMapFrameNo) {
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
        else {
            this.toastr.error("请输入车架号");
        }
    };
    RealTimeMapComponent.prototype.showPath = function () {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            mapObject.historyPoints(point.geoPoint, point.alarmState, gnss_data_1.GnssData.getRealTimeInfo(point));
        }
    };
    RealTimeMapComponent.prototype.getRealTimeGnssData = function () {
        this.lng += 0.001;
        this.realTimeGnssData = {
            'dateStr': '2017-06-30 07:36:11',
            'plateColor': 2,
            'plateNo': '皖A35898',
            'posEncrypt': 0,
            'geoPoint': this.lng + "," + this.lat,
            'gpsSpeed': 60,
            'totalMileage': 1,
            'recSpeed': 60,
            'direction': 350,
            'altitude': 0,
            'vehicleState': 3,
            'alarmState': 0
        };
        mapObject.realTimePoint(this.realTimeGnssData.geoPoint, gnss_data_1.GnssData.getRealTimeInfo(this.realTimeGnssData));
    };
    return RealTimeMapComponent;
}());
RealTimeMapComponent = __decorate([
    core_1.Component({
        selector: 'app-map',
        templateUrl: 'real-time-map.component.html',
        styleUrls: ['real-time-map.component.css']
    })
], RealTimeMapComponent);
exports.RealTimeMapComponent = RealTimeMapComponent;
