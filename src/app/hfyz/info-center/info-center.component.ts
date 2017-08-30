import {Component, Injector, OnInit} from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import {InfoCenterService} from './shared/info-center.service';
import {LayoutComponent} from '../layout/main-tab/layout.component';

@Component({
    selector: 'app-info-center',
    templateUrl: './info-center.component.html',
    styleUrls: ['./info-center.component.css']
})
export class InfoCenterComponent implements OnInit {
    list: any[];
    layoutComponent: any;
    pageMaxOrder: number;
    pageTotalOrder: number;
    pageFirstOrder: number;
    pageOffsetOrder: number;

    constructor(private _infoCenterService: InfoCenterService
        , private _loadingService: TdLoadingService
        , private inj: Injector) {

        this.layoutComponent = this.inj.get(LayoutComponent);

        this.pageMaxOrder = 10;
        this.pageTotalOrder = 0;
        this.pageFirstOrder = 0;
        this.pageOffsetOrder = 0;
    }


    ngOnInit() {
        this.initData();
    }

    initData() {
            this._loadingService.register();
            this._infoCenterService.list(this.pageMaxOrder, this.pageFirstOrder, 'GD').subscribe(
                res => {
                    this._loadingService.resolve();
                    this.list = res.list;
                    this.pageTotalOrder = res.total;
                    this.pageOffsetOrder = this.pageFirstOrder;
                }
            );
    }

    click(order) {
        this._loadingService.register();
        this._infoCenterService.changeState(order.id).subscribe(
            res => {
                this._loadingService.resolve();
                console.log('=====sourceId=====' + order.sourceId);
                console.log('=====action=====' + order.action);
                let code = '';
                if (order.action === 'YP') {
                    code = 'pendingWorkOrder';
                }
                if (order.action === 'FK') {
                    code = 'feedbackWorkOrder';
                }
                if (order.action === '') {
                    code = 'workOrder';
                }
                const menu = {
                    name: '工单处理', code: code, inputs: {sourceId: order.sourceId, action: order.action}
                };
                this.layoutComponent.addTab(menu);
            }
        );
    }
    paginateOrder(event) {
        if (this.pageOffsetOrder !== event.first) {
            this.initData();
        }
    }
}
