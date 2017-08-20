import { TdLoadingService } from '@covalent/core';
import { StatisticService } from './../shared/statistic.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-owner-identity-statistic',
    templateUrl: './owner-identity-statistic.component.html',
    styleUrls: ['./owner-identity-statistic.component.css']
})
export class OwnerIdentityStatisticComponent implements OnInit {
    ownerName: String;
    records: any[];

    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    constructor(private _statisticService: StatisticService
        , private _loadingService: TdLoadingService) {
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.ownerName = '';
        this.records = []
    }

    ngOnInit() {
        this.getAppraiseStatistic();
    }

    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.getAppraiseStatistic();
        }
    }

    getAppraiseStatistic() {
        this._loadingService.register();
        this._statisticService.getAppraiseStatistic(this.ownerName, this.pageMax, this.pageFirst).subscribe(res => {
            this._loadingService.resolve();
            this.records = res.resultList;
            this.pageTotal = res.total;
            this.pageOffset = this.pageFirst;
        })
    }

    onSearch() {
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.getAppraiseStatistic();
    }

    onReset() {
        this.ownerName = '';
        this.records = [];
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.getAppraiseStatistic();
    }

}
