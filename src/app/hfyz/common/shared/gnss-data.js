"use strict";
var GnssData = (function () {
    function GnssData(dateStr, plateColor, plateNo, posEncrypt, geoPoint, gpsSpeed, totalMileage, recSpeed, direction, altitude, vehicleState, alarmState) {
        this.dateStr = dateStr;
        this.plateColor = plateColor;
        this.plateNo = plateNo;
        this.posEncrypt = posEncrypt;
        this.geoPoint = geoPoint;
        this.gpsSpeed = gpsSpeed;
        this.totalMileage = totalMileage;
        this.recSpeed = recSpeed;
        this.direction = direction;
        this.altitude = altitude;
        this.vehicleState = vehicleState;
        this.alarmState = alarmState;
    }
    GnssData.getRealTimeInfo = function (realTimeGnssData) {
        var html = "\n      \u8F66\u724C\u53F7\u7801\uFF1A" + realTimeGnssData.plateNo + "<br/>\n      \u8F66\u8F86\u989C\u8272\uFF1A" + realTimeGnssData.plateColor + "<br/>\n      \u7ECF\u7EAC\u5EA6\uFF1A" + realTimeGnssData.geoPoint + "<br/>\n      \u901F\u5EA6\uFF1A" + realTimeGnssData.gpsSpeed + "km/h<br/>\n      \u603B\u91CC\u7A0B\u6570\uFF1A" + realTimeGnssData.totalMileage + "<br/>\n      \u884C\u9A76\u8BB0\u5F55\u901F\u5EA6\uFF1A" + realTimeGnssData.recSpeed + "km/h<br/>\n      \u65B9\u5411\uFF1A" + realTimeGnssData.direction + "<br/>\n      \u6D77\u62D4\u9AD8\u5EA6\uFF1A" + realTimeGnssData.altitude + "<br/>\n      \u8F66\u8F86\u72B6\u6001\uFF1A" + realTimeGnssData.vehicleState + "<br/>\n      \u62A5\u8B66\u72B6\u6001\uFF1A" + realTimeGnssData.alarmState + "<br/>\n      \u66F4\u65B0\u65F6\u95F4\uFF1A" + realTimeGnssData.dateStr + "\n    ";
        return html;
    };
    return GnssData;
}());
exports.GnssData = GnssData;
