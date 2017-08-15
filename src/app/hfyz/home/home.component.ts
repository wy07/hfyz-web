import {Component, OnInit} from '@angular/core';
import {HomeService} from "./home.service";
import {StatisticService} from "../statistic/shared/statistic.service";
import {TdLoadingService} from "@covalent/core";
import {RegularService} from "../common/shared/regular.service";

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    carNum: number;
    enterCarNum: number;
    onlineCarNum: number;

    enterCarRateOption: any;
    onlineCarRateOption: any;
    historyOption: any;

    historyDataset: any[];

    years: any[];
    year: number;

    org: string;
    selectedTab: string;


    carGaugeChartRates: any[];
    currentCarGaugeChartRate: string;
    carGaugeChartRateOption: any;

    carPieChartRates: any[];
    carPieChartRateOption: any;
    currentCarPieChartRate: string;

    regionBarBrushOption: any;

    workOrderBarChartOption: any;

    warningLineChartOption: any;

    constructor(private _homeService: HomeService
        , private _statisticService: StatisticService
        , private _loadingService: TdLoadingService
        , private regularService: RegularService) {
        this.carNum = 1000;
        this.enterCarNum = 1000;
        this.onlineCarNum = 1000;
        let historyInitDate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


        this.carGaugeChartRates = [
            {
                name: '车辆入网率',
                data: [{value: 100}],
                code: 'enter'
            }
            , {
                name: '车辆上线率',
                data: [{value: 100}],
                code: 'online'
            }
            , {
                name: '查岗相应率',
                data: [{value: 100}],
                code: 'check'
            }
            , {
                name: '超速车辆率',
                data: [{value: 0}],
                code: 'overspeed'
            }
            , {
                name: '疲劳驾驶率',
                data: [{value: 0}],
                code: 'fatigue'
            }];
        this.setCarGaugeChartRateOption('enter');
        this.currentCarGaugeChartRate = 'enter';

        this.carPieChartRates = [
            {
                name: '按车辆',
                code: 'car',
                data: [
                    {
                        "value": 2350,
                        "name": "危货",
                        "selected": true
                    },
                    {
                        "value": 3790,
                        "name": "班车"
                    },
                    {
                        "value": 5480,
                        "name": "旅游包车"
                    }
                ]
            }
            , {
                name: '按企业',
                code: 'company',
                data: [{value: 335, name: '危货'},
                    {value: 310, name: '班车'},
                    {value: 234, name: '旅游包车'}]
            }
            , {
                name: '按从业人员',
                code: 'people',
                data: [{value: 5630, name: '危货'},
                    {value: 5401, name: '班车'},
                    {value: 4531, name: '旅游包车'}]
            }];
        this.currentCarPieChartRate = 'car';
        this.setCarPieChartRateOption('car');


        this.year = new Date().getFullYear();
        let month: number = new Date().getMonth();

        this.years = [];
        for (let i = this.year; i > this.year - 30; i--) {
            this.years.push(i);
        }


        this.setEnterCarRateOption();
        this.setOnlineCarRateOption();

        this.historyOption = this._homeService.carHistoryLineCarOption();

        this.getHistoryDataset(historyInitDate.splice(0, month)
            , historyInitDate.splice(0, month)
            , historyInitDate.splice(0, month)
            , historyInitDate.splice(0, month)
            , historyInitDate.splice(0, month)
            , historyInitDate.splice(0, month))


        var xAxisData = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var data4 = [];

        for (var i = 0; i < 9; i++) {
            xAxisData.push('Class' + i);
            data1.push((Math.random() * 5).toFixed(2));
            data2.push((Math.random() * 2).toFixed(2));
            // data4.push((Math.random() + 0.3).toFixed(2));
        }

        this.setRegionBarBrushOption([300, 210, 400, 330, 540, 120, 321, 532, 123]
            , [400, 650, 550, 460, 710, 430, 651, 772, 333]);


        this.setworkOrderBarChartOption([420, 540, 700, 200], [120, 140, 100, 100], [20, 40, 10, 60], [220, 430, 210, 160])


        this.setWarningLineChartOption(['九月', '十月', '十一月', '十二月','一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月']
            ,[13200, 11000, 9003, 12000,3000, 2001, 14563, 2311, 20001, 12300, 6000, 2133]
            ,[1320, 1000, 6003, 1200,300, 200, 1456, 231, 2000, 1230, 600, 213]
            ,[11200, 12001, 7800, 8800,4001, 3232, 11009, 3456, 12312, 11221, 2321, 5443]);
    }

    ngOnInit() {
        this.getHome();
    }


    getHome() {
        this._loadingService.register()
        this._homeService.home().subscribe(
            res => {
                this._loadingService.resolve()
                this.org = res.org;
                const tab1 = ['24', '23', '22', '21', '20', '19', '18', '17', '08', '09', '13'];
                if (!(tab1.find(x => x === this.org) === undefined)) {
                    this.selectedTab = 'tab1';
                    this.carNum = res.carNum;
                    this.enterCarNum = res.enterCarNum;
                    this.onlineCarNum = res.onlineCarNum;

                    this.setEnterCarRateOption();
                    this.setOnlineCarRateOption();


                    this.getHistoryDataset(res.statistic.enterRate
                        , res.statistic.onlineRate
                        , res.statistic.onlineTimeRate
                        , res.statistic.overspeedRate
                        , res.statistic.fatigueRate
                        , res.statistic.realTimeOnlineRate);
                }else{
                    this.selectedTab = 'tab2'
                }
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

    setEnterCarRateOption() {
        this.enterCarRateOption = this._homeService.gaugeChartRateOption('入网率', [{
            value: (this.enterCarNum / this.carNum * 100).toFixed(2),
            name: '入网率'
        }])
    }

    setOnlineCarRateOption() {
        this.onlineCarRateOption = this._homeService.gaugeChartRateOption('在线率', [{
            value: (this.onlineCarNum / this.carNum * 100).toFixed(2),
            name: '在线率'
        }])
    }

    getHistoryDataset(enterRate, onlineRate, onlineTimeRate, overspeedRate, fatigueRate, realTimeOnlineRate) {
        this.historyDataset = [enterRate, onlineRate, onlineTimeRate, overspeedRate, fatigueRate, realTimeOnlineRate]

    }

    onSelectCarRateGaugeChart(code) {
        this.currentCarGaugeChartRate = code;
        this.setCarGaugeChartRateOption(code);
    }

    onChangeCarPieChartRadio(code) {
        this.setCarPieChartRateOption(code)
    }

    setCarPieChartRateOption(code) {
        let item = this.carPieChartRates.find(x => x.code === code);
        this.carPieChartRateOption = this._homeService.pieChartRateOption(item.name, ['危货', '班车', '旅游包车'], item.data)
    }

    setCarGaugeChartRateOption(code) {
        let item = this.carGaugeChartRates.find(x => x.code === code);
        this.carGaugeChartRateOption = this._homeService.gaugeChartRateOption(item.name, item.data)

    }

    setRegionBarBrushOption(onlineData, offlineData) {
        this.regionBarBrushOption = this._homeService.regionBarBrushOption(onlineData, offlineData)
    }

    setworkOrderBarChartOption(doneData, doingData, todoData, freezeData) {
        this.workOrderBarChartOption = this._homeService.workOrderBarChartOption(doneData, doingData, todoData, freezeData)
    }

    setWarningLineChartOption(xAxisData,promptData,normalData,seriousData){
        this.warningLineChartOption=this._homeService.warningLineChartOption(xAxisData,promptData,normalData,seriousData)
    }
}
;
