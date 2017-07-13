"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var gnss_data_1 = require("../../common/shared/gnss-data");
var HistoryMapComponent = (function () {
    function HistoryMapComponent() {
        this.n = 0;
        this.points = [];
    }
    HistoryMapComponent.prototype.ngOnInit = function () {
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
            }];
        this.showPath();
    };
    HistoryMapComponent.prototype.showPath = function () {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            console.log(point.geoPoint);
            mapObject.historyPoints(point.geoPoint, point.alarmState, gnss_data_1.GnssData.getRealTimeInfo(point));
        }
    };
    return HistoryMapComponent;
}());
HistoryMapComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-h-map',
        templateUrl: 'history-map.component.html',
        styleUrls: ['history-map.component.css']
    })
], HistoryMapComponent);
exports.HistoryMapComponent = HistoryMapComponent;
