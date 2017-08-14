import { Component, OnInit } from '@angular/core';
import { StatisticService } from "../shared/statistic.service";

@Component({
    selector: 'app-car-basic-statistics',
    templateUrl: './car-basic-statistics.component.html',
    styleUrls: ['./car-basic-statistics.component.css']
})
export class CarBasicStatisticsComponent implements OnInit {

    carNum: number;
    enterCarNum: number;
    onlineCarNum: number;

    enterCarRate: any;
    onlineCarRate: any;
    historyOption: any;

    enterCarRateDataset: any[];
    onlineCarRateDataset: any[];
    historyDataset: any[];


    months: any[];
    years: any[];
    year: number;

    constructor(private _statisticService: StatisticService) {
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

        this.enterCarRate = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: '入网率',
                    type: 'gauge',
                    detail: { formatter: '{value}%' },
                    // data:[{value: this.enterCarNum/this.carNum*100, name: '入网率'}]
                }
            ]
        };

        this.onlineCarRate = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: '入网率',
                    type: 'gauge',
                    detail: { formatter: '{value}%' },
                    data: [{ value: this.onlineCarNum / this.carNum * 100, name: '入网率' }]
                }
            ]
        };


        this.getEnterCarRateDataset();
        this.getOnlineCarRateDataset();

        this.historyOption = {
            // title : {
            //     text: '未来一周气温变化',
            //     subtext: '纯属虚构'
            // },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['车辆入网率', '车辆上线率', '在线时长率', '超速车辆率', '疲劳驾驶率', '车辆实时在线率']
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
                    name: '车辆入网率',
                    type: 'line',
                    data: historyInitDate.splice(0, month)
                },
                {
                    name: '车辆上线率',
                    type: 'line',
                    data: historyInitDate.splice(0, month)
                },
                {
                    name: '在线时长率',
                    type: 'line',
                    data: historyInitDate.splice(0, month)
                },
                {
                    name: '超速车辆率',
                    type: 'line',
                    data: historyInitDate.splice(0, month)
                },
                {
                    name: '疲劳驾驶率',
                    type: 'line',
                    data: historyInitDate.splice(0, month)
                },
                {
                    name: '车辆实时在线率',
                    type: 'line',
                    data: historyInitDate.splice(0, month)
                }
            ]
        };

        this.getHistoryDataset(historyInitDate.splice(0, month)
            , historyInitDate.splice(0, month)
            , historyInitDate.splice(0, month)
            , historyInitDate.splice(0, month)
            , historyInitDate.splice(0, month)
            , historyInitDate.splice(0, month))
    }

    ngOnInit() {
        this.getCarNumStatistic();
        this.getCarHistoryStatistic();
    }

    getCarNumStatistic() {
        this._statisticService.carNumStatistic().subscribe(
            res => {
                this.carNum = res.carNum;
                this.enterCarNum = res.enterCarNum;
                this.onlineCarNum = res.onlineCarNum;

                this.getEnterCarRateDataset();
                this.getOnlineCarRateDataset();
            }
        )
    }

    getCarHistoryStatistic() {
        this._statisticService.carHistoryStatistic(this.year).subscribe(
            res => {
                this.getHistoryDataset(res.statistic.enterRate
                    , res.statistic.onlineRate
                    , res.statistic.onlineTimeRate
                    , res.statistic.overspeedRate
                    , res.statistic.fatigueRate
                    , res.statistic.realTimeOnlineRate);
            }
        )
    }

    getEnterCarRateDataset() {
        this.enterCarRateDataset = [{ value: (this.enterCarNum / this.carNum * 100).toFixed(2), name: '入网率' }];
    }

    getOnlineCarRateDataset() {
        this.onlineCarRateDataset = [{ value: (this.onlineCarNum / this.carNum * 100).toFixed(2), name: '在线率' }];
    }

    getHistoryDataset(enterRate, onlineRate, onlineTimeRate, overspeedRate, fatigueRate, realTimeOnlineRate) {
        this.historyDataset = [enterRate, onlineRate, onlineTimeRate, overspeedRate, fatigueRate, realTimeOnlineRate]
    }


}
