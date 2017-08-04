import { NgRadio } from 'ng-radio';
import { EventBuservice } from './../../common/shared/eventbus.service';
import { TdLoadingService } from '@covalent/core';
import { RegularService } from '../../common/shared/regular.service';
import { Component, OnInit, Injector } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { CarService } from '../shared/car.service';
import { LayoutComponent } from '../../layout/main-tab/layout.component';
@Component({
    selector: 'car-list',
    templateUrl: 'car-list.component.html'
})

export class CarListComponent implements OnInit {
    max: number;
    currentPage: number;
    totalCars: number;

    cars: any[];
    businessTypes: any[];
    businessType: string;
    licenseNo: string;
    layoutComponent: any;

    constructor(private toastr: ToastsManager
        , private regularService: RegularService
        , private carService: CarService
        , private _loadingService: TdLoadingService
        , private eventBuservice: EventBuservice
        , private radio: NgRadio
        , private inj: Injector) {
        this.max = 10;
        this.currentPage = 0;
        this.totalCars = 0;
        this.cars = [];
        this.licenseNo = '';
        this.businessTypes = [{ label: '全部', value: '' }, { label: '班线客车', value: '班线客车' },
        { label: '旅游包车', value: '旅游包车' }, { label: '危险品运输车', value: '危险品运输车' }]
        this.businessType = '';
        this.layoutComponent = this.inj.get(LayoutComponent);
    }

    ngOnInit() {
        this.loadDate();
    }

    search() {
        this.loadDate();
    }

    loadDate(offset = 0) {
        // if(this.regularService.isBlank(this.businessType)){
        //   this.toastr.error('请选择行业类别');
        //   return false;
        // }
        this._loadingService.register();
        this.carService.search(this.businessType, this.licenseNo, this.max, offset).subscribe(
            res => {
                this._loadingService.resolve();
                this.cars = res.carList;
                this.totalCars = res.carCount;
            }
        );
    }

    paginate(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.loadDate(this.max * event.page);
        }
    }

    showRealTimeMap(item) {
        // this.mapComponent.registerHandler(item.frameNo);
        // this.mapComponent.test();
        const $this = this;
        const menu = { name: '实时状态', icon: 'fa-map', code: 'realTimeMap', inputs: { frameNo: item.licenseNo, id: item.frameNo } };
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
        const menu = { name: '实时监控', icon: 'fa-map', code: 'realTimeMonitorMap', inputs: { frameNo: item.licenseNo, id: item.frameNo } };
        this.layoutComponent.addTab(menu);
    }

    showHistoryMapp(item) {
        const menu = { name: '历史轨迹', icon: 'fa-map', code: 'historyMap', inputs: { frameNo: item.licenseNo, id: item.frameNo } };
        this.layoutComponent.addTab(menu);
    }

}
