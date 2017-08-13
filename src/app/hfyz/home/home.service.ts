import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class HomeService {


    constructor(public restangular: Restangular) {
    }


    home() {
        return this.restangular.all('home').customGET('');
    }


    gaugeChartRateOption(title, data) {
        return {
            title: {
                x: 'center',
                y: 'top',
                text: title,
            },
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: 'title',
                    type: 'gauge',
                    detail: {formatter: '{value}%'},
                    data: data
                }
            ]
        };
    }

    pieChartRateOption(title, legendDate, seriesData) {
        return {
            title: {
                text: title,
                x: 'center'
            },
            "tooltip": {
                "trigger": "item",
                "formatter": "{a} <br/>{b}: {c} ({d}%)"
            },
            "legend": {
                "orient": "vertical",
                "x": "left",
                "data": legendDate
            },
            "series": [
                {
                    "name": "访问来源",
                    "type": "pie",
                    "selectedMode": "single",
                    "radius": [
                        0,
                        "65%"
                    ],
                    "label": {
                        "normal": {
                            "position": "inner"
                        }
                    },
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": seriesData
                }
            ]
        };
    }

    carHistoryLineCarOption() {
        return {
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
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
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
                    type: 'line'
                },
                {
                    name: '车辆上线率',
                    type: 'line'
                },
                {
                    name: '在线时长率',
                    type: 'line'
                },
                {
                    name: '超速车辆率',
                    type: 'line'
                },
                {
                    name: '疲劳驾驶率',
                    type: 'line'
                },
                {
                    name: '车辆实时在线率',
                    type: 'line'
                }
            ]
        };
    }

    regionBarBrushOption(onlineData, offlineData) {
        return {
            legend: {
                data: ['在线', '离线'],
                align: 'left',
                left: 10
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: ['瑶海区', '庐阳区', '蜀山区', '包河区', '巢湖市', '长丰县', '肥东县', '肥西县', '庐江县'],
            },
            yAxis: {
                type: 'value',
                show: false
            },
            series: [
                {
                    name: '在线',
                    type: 'bar',
                    stack: 'one',
                    data: onlineData
                },
                {
                    name: '离线',
                    type: 'bar',
                    stack: 'one',
                    data: offlineData
                }
            ]
        }
    }

    workOrderBarChartOption(doneData,doingData,todoData,freezeData) {
        return {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['已处理', '进行中', '未处理', '逾期冻结']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['客运科', '货运科', '企业', '法制科']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: false
                }
            ],
            series: [
                {
                    name: '已处理',
                    type: 'bar',
                    data: doneData
                },
                {
                    name: '进行中',
                    type: 'bar',
                    data: doingData
                },
                {
                    name: '未处理',
                    type: 'bar',
                    data: todoData
                },
                {
                    name: '逾期冻结',
                    type: 'bar',
                    data: freezeData
                }
            ]
        }
    }

    warningLineChartOption(xAxisData,promptData,normalData,seriousData){
        return {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['提示告警', '一般告警', '严重告警']
            },
            grid: {
                left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
            },
            xAxis: {
                type: 'category',
                    boundaryGap: false,
                    data: xAxisData
            },
            yAxis: {
                type: 'value',
                axisTick:{
                    show:false
                },
                axisLabel:{
                    show:false,
                    margin:0
                }
            },
            series: [
                {
                    name:'提示告警',
                    type:'line',
                    data:promptData
                },
                {
                    name:'一般告警',
                    type:'line',
                    data:normalData
                },
                {
                    name:'严重告警',
                    type:'line',
                    data:seriousData
                }
            ]
        }
    }
}
