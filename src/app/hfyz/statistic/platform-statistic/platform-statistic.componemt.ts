import { Component, OnInit } from '@angular/core';
import { StatisticService } from "../shared/statistic.service";

@Component({
    selector: 'app-platform-statistic',
    templateUrl: './platform-statistic.component.html',
    styleUrls: ['./platform-statistic.component.css']
})
export class PlatformStatisticComponent implements OnInit {
    num: number;
    carNum: number;
    enterCarNum: number;
    onlineCarNum: number;

    offline: number;
    failure: number;
    respone: number;


    offlineRate: any;
    failureRate: any;
    responseRate: any;
    historyOption: any;

    offlineRateDataset: any[];
    failureRateDataset: any[];
    responseRateDataset: any[];
    historyDataset: any[];


    months: any[];
    years: any[];
    year: number;

    constructor(private _statisticService: StatisticService) {
        this.num = 100;
        this.carNum = 1000;
        this.enterCarNum = 1000;
        this.onlineCarNum = 1000;
        this.months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        let historyInitDate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.year = new Date().getFullYear();
        let month: number = new Date().getMonth();

        this.years = [];
        for (let i = this.year; i > this.year - 30; i--) {
            this.years.push(i);
        }

        this.offlineRate = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: '平台断线率',
                    type: 'gauge',
                    detail: { formatter: '{value}%' },
                    data:[{value: this.offline/this.num * 100, name: '平台断线率'}]
                }
            ]
        };

        this.failureRate = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: '数据不合格率',
                    type: 'gauge',
                    detail: { formatter: '{value}%' },
                    data: [{ value: this.failure/ this.num * 100, name: '数据不合格率' }]
                }
            ]
        };

        this.responseRate = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: '查岗应答率',
                    type: 'gauge',
                    detail: { formatter: '{value}%' },
                    data: [{ value: this.respone/this.num * 100, name: '查岗应答率' }]
                }
            ]
        };


        this.getOfflineRateDataset();
        this.getResponseRateDataset();
        this.getFailureRateDataset();

        this.historyOption = {
            // title : {
            //     text: '未来一周气温变化',
            //     subtext: '纯属虚构'
            // },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['平台断线率', '数据不合格率', '查岗响应率']
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.months
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    min: 0,
                    max: 100,
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series: [
                {
                    name: '平台断线率',
                    type: 'line',
                    data: historyInitDate.splice(0, month)
                },
                {
                    name: '数据不合格率',
                    type: 'line',
                    data: historyInitDate.splice(0, month)
                },
                {
                    name: '查岗响应率',
                    type: 'line',
                    data: historyInitDate.splice(0, month)
                }
            ]
        };

        this.getHistoryDataset(historyInitDate.splice(0, month)
            , historyInitDate.splice(0, month)
            , historyInitDate.splice(0, month))
    }

    ngOnInit() {
        this.getPlatformStatistic();
        this.getCarHistoryStatistic();
    }

    getPlatformStatistic() {
        this._statisticService.getPlatformStatistic().subscribe(
            res => {
                this.offline = res.platformList.offline;
                this.failure = res.platformList.failure;
                this.respone = res.platformList.response;
                this.getOfflineRateDataset();
                this.getFailureRateDataset();
                this.getResponseRateDataset();
            }
        )
    }

    getCarHistoryStatistic() {
        this._statisticService.carHistoryStatistic(this.year).subscribe(
            res => {
                this.getHistoryDataset(res.statistic.enterRate
                    , res.statistic.onlineRate
                    , res.statistic.onlineTimeRate
                    );
            }
        )
    }

    getOfflineRateDataset() {
        this.offlineRateDataset = [{ value: (this.offline/this.num * 100).toFixed(2), name: '平台断线率' }];
    }

    getFailureRateDataset() {
        this.failureRateDataset = [{ value: (this.failure/this.num * 100).toFixed(2), name: '数据不合格率' }];
    }

    getResponseRateDataset(){
        this.responseRateDataset = [{ value: (this.respone/this.num * 100).toFixed(2), name: '查岗响应率' }];
    }
    

    getHistoryDataset(offlineRate, failureRate, responseRate ) {
        this.historyDataset = [offlineRate, failureRate, responseRate]
    }


}
