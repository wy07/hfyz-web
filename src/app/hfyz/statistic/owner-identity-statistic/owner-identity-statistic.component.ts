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

    constructor(private _statisticService: StatisticService
        , private _loadingService: TdLoadingService) {
        this.ownerName = '';
        this.records = []
    }

    ngOnInit() {
        this.getAppraiseStatistic();
    }

    getAppraiseStatistic() {
        this._loadingService.register();
        this._statisticService.getAppraiseStatistic(this.ownerName).subscribe(res => {
            this._loadingService.resolve();
            this.records = res.resultList
        })
    }

    onSearch() {
        this.getAppraiseStatistic();
    }

    onCancel() {
        this.ownerName = '';
        this.records = [];
        this.getAppraiseStatistic();
    }

}
