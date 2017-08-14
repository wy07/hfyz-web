import { zh } from './../../common/shared/zh';
import { RegularService } from './../../common/shared/regular.service';
import { TdLoadingService } from '@covalent/core';
import { DatePipe } from '@angular/common';
import { StatisticService } from './../shared/statistic.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-alarm-info-statistic',
    templateUrl: './alarm-info-statistic.component.html',
    styleUrls: ['./alarm-info-statistic.component.css']
})
export class AlarmInfoStatisticComponent implements OnInit {
    startDate: any;
    endDate: any;
    records: any[];
    zh = zh;

    constructor(private _statisticService: StatisticService
        , private _datePipe: DatePipe
        , private _regularService: RegularService
        , private _loadingService: TdLoadingService) {
        this.startDate = new Date();
        this.endDate = new Date();
        this.records = []
    }

    ngOnInit() {
        this.getAlarmInfoStatistic();
    }

    getAlarmInfoStatistic() {
        const startDate = this._datePipe.transform(this.startDate, 'yyyy-MM-dd')
        const endDate = this._datePipe.transform(this.endDate, 'yyyy-MM-dd')
        const params = {startDate: this.startDate, endDate: this.endDate};
        this._loadingService.register();
        this._statisticService.alarmInfoStatistic(params).subscribe(res => {
            this._loadingService.resolve();
            this.records = res.resultList
        })
    }

    onSearch() {
        this.getAlarmInfoStatistic();
    }

    onCancel() {
        this.startDate = new Date();
        this.endDate = new Date();
        this.records = [];
    }

}
