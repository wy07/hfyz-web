import { DatePipe } from '@angular/common';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MapService {
    change: EventEmitter<any>;

    constructor(private datePipe: DatePipe) {
        this.change = new EventEmitter();
    }

    getHistoryData(plateNo) {
        console.log('====plateNo===' + plateNo)
        const points = [];
        const num = 10;
        let dateTime = new Date().getTime();
        for (let i = 0; i < num; i++) {
            dateTime = i==0?dateTime : (dateTime + 30 * 1000);
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
};
