import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class CarService {


    constructor(public restangular: Restangular
        , private datePipe: DatePipe) {
    }


    search(dateBegin, dateEnd, businessType, licenseNo, max, offset) {
        return this.restangular.all('cars').customGET('search', {
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            businessType: businessType,
            licenseNo: licenseNo,
            max: max,
            offset: offset
        });
    }

    getCompanyCars(companyCode) {
        return this.restangular.one('companys', companyCode).customGET('cars')
    }

    detail(id) {
        return this.restangular.one('cars', id).customGET('detail');
    }

    getWarning(id, max, offset) {
        return this.restangular.one('cars', id).customGET('get-warning', { max: max, offset: offset });
    }

    getHistory(id) {
        return this.restangular.one('cars', id).customGET('get-history');
    }

    getWarningAndHistorys(licenseNo, max) {
        return this.restangular.all('cars').customGET('warning-and-historys', { licenseNo: licenseNo, max: max })
    }

    getHistoryInfo(licenseNo, startDate, endDate) {
        return this.restangular.all('cars').customGET('history-info', { licenseNo: licenseNo, startDate: startDate, endDate: endDate })
    }


    getHistoryData(plateNo) {
        const points = [];
        const num = 10;
        let dateTime = new Date().getTime();
        for (let i = 0; i < num; i++) {
            dateTime = i === 0 ? dateTime : (dateTime + 30 * 1000);
            const date = this.datePipe.transform(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss');
            const point = {
                dateStr: date,
                plateColor: i + 1,
                plateNo: plateNo,
                posEncrypt: 0,
                geoPoint: '116.37168,39.93218',
                gpsSpeed: '60',
                totalMileage: 1,
                recSpeed: 60,
                direction: 100,
                altitude: 0,
                vehicleState: 3,
                alarmState: 1
            }
            points.push(point);
        }
        return points
    }

    getHistoryAlarmData(plateNo) {
        const alarms = [];
        const num = 10;
        let dateTime = new Date().getTime();
        for (let i = 0; i < num; i++) {
            dateTime = i === 0 ? dateTime : (dateTime + 30 * 1000);
            const date = this.datePipe.transform(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss');
            const alarm = {
                dateStr: date,
                alarmType: '车辆超速',
                alarmLevel: '一般告警',
                plateNo: plateNo
            }
            alarms.push(alarm);
        }
        return alarms
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
