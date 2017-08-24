import { NgRadio } from 'ng-radio';
import { EventBuservice } from './../../common/shared/eventbus.service';
import { TdLoadingService } from '@covalent/core';
import { RegularService } from '../../common/shared/regular.service';
import { Component, OnInit, Injector } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { CarService } from '../shared/car.service';
import { LayoutComponent } from '../../layout/main-tab/layout.component';
import { DatePipe } from '@angular/common';
import { zh } from '../../common/shared/zh';

@Component({
    selector: 'car-list',
    templateUrl: 'car-list.component.html',
    styleUrls: ['car-list.component.css']
})

export class CarListComponent implements OnInit {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    cars: any[];
    businessTypes: any[];
    businessType: string;
    licenseNo: string;
    dateBegin: Date;
    dateEnd: Date;
    layoutComponent: any;
    action: string;
    zh = zh;
    car: any;
    warningList: any;
    constructor(private _toastr: ToastsManager
        , private regularService: RegularService
        , private _carService: CarService
        , private _loadingService: TdLoadingService
        , private eventBuservice: EventBuservice
        , private datePipe: DatePipe
        , private radio: NgRadio
        , private inj: Injector) {
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.cars = [];
        this.licenseNo = '';
        this.dateBegin = null;
        this.dateEnd = null;
        this.action = 'list';
        this.businessTypes = [{ label: '全部', value: '' }, { label: '班线客车', value: '班线客车' },
        { label: '旅游包车', value: '旅游包车' }, { label: '危险品运输车', value: '危险品运输车' }]
        this.businessType = '';
        this.layoutComponent = this.inj.get(LayoutComponent);
    }

    ngOnInit() {
        this.loadData();
    }

    search() {
        if (this.validate()) {
            this.pageFirst = 0;
            this.pageOffset = 0;
            this.loadData();
        }
    }
    onReset() {
        this.businessType = '';
        this.licenseNo = '';
        this.dateBegin = null;
        this.dateEnd = null;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.loadData();
    }
    loadData() {
        // if(this.regularService.isBlank(this.businessType)){
        //   this.toastr.error('请选择行业类别');
        //   return false;
        // }
        const begin = this.dateBegin ? this.datePipe.transform(this.dateBegin, 'yyyy-MM-dd HH:mm:ss') : ''
        const end = this.dateEnd ? this.datePipe.transform(this.dateEnd, 'yyyy-MM-dd HH:mm:ss') : ''
        this._loadingService.register();
        this._carService.search(begin, end, this.businessType, this.licenseNo, this.pageMax, this.pageFirst).subscribe(
            res => {
                this._loadingService.resolve();
                this.cars = res.carList;
                this.pageTotal = res.carCount;
                this.pageOffset = this.pageFirst;
            }
        );
    }

    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.loadData();
        }
    }

    showRealTimeMap(item) {
        // this.mapComponent.registerHandler(item.frameNo);
        // this.mapComponent.test();
        const $this = this;
        const menu = {
            name: '实时状态',
            icon: 'fa-map',
            code: 'realTimeMap',
            inputs: { frameNo: item.licenseNo, id: item.frameNo, currentRealTimeAccordion: 'singleCar' }
        };
        this.layoutComponent.addTab(menu);
        // .then(res => {
        //     console.log('======showRealTimeMap=====')
        //     let intervalId = setInterval(() => {
        //         console.log('======showRealTimeMap==setInterval===')
        //         $this.radio.cast('realTime:open',item.frameNo);
        //     }, 2000);
        // });
    }

    showRealTimeMonitorMap(item) {
        const menu = {
            name: '实时监控',
            icon: 'fa-map',
            code: 'realTimeMonitorMap',
            inputs: { frameNo: item.licenseNo, id: item.frameNo }
        };
        this.layoutComponent.addTab(menu);
    }

    showHistoryMapp(item) {
        const menu = {
            name: '历史轨迹',
            icon: 'fa-map',
            code: 'historyMap',
            inputs: { frameNo: item.licenseNo, id: item.frameNo }
        };
        this.layoutComponent.addTab(menu);
    }

    showDetail(car) {
        this.action = 'detail';
        this._carService.detail(car.id)
        this._loadingService.register();
        this._carService.detail(car.id).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    console.log('====res====' + JSON.stringify(res));
                    this.car = res.car;
                    this.warningList = res.warningResult.warningList
                    console.log('====waringList====' + JSON.stringify(this.warningList));
                } else {
                    this._toastr.error('获取数据失败');
                }
            }
        );
    }

    /**
     * 搜索参数验证
     */
    validate() {
        let flag = true
        if (this.dateBegin && this.dateEnd) {
            if (this.dateBegin > this.dateEnd) {
                flag = false;
                this._toastr.error('开始时间不能大于结束时间！');
            }
        }
        if ((this.dateBegin || this.dateEnd) && !(this.dateBegin && this.dateEnd)) {
            flag = false
            this._toastr.error('起止时间必须全部填写！')
        }
        return flag
    }

    return() {
        this.action = 'list';
    }
}
