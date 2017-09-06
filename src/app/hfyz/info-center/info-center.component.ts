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

    max: number;
    total: number;
    currentPage: number;
    constructor(private _infoCenterService: InfoCenterService
        , private _loadingService: TdLoadingService
        , private inj: Injector) {

        this.layoutComponent = this.inj.get(LayoutComponent);
        this.max = 12;
        this.list = [];
    }


    ngOnInit() {
        this.initData();
    }

    initData(offset = 0) {
        this._loadingService.register();
        this._infoCenterService.list(this.max, offset).subscribe(
            res => {
                this._loadingService.resolve();
                this.list = res.list;
                this.total = res.total;
            }
        );
    }

    click(info) {
        let code = '';
        let inputs = {};
        this._loadingService.register();
        this._infoCenterService.changeState(info.id).subscribe(
            res => {
                this._loadingService.resolve();
                if (info.sourceType === '工单') {
                    if (info.action === 'DYP' || info.action === 'DSH') {
                        code = 'pendingWorkOrder';
                    }else if (info.action === 'DFK') {
                        code = 'feedbackWorkOrder';
                    }else if (info.action === 'YWC') {
                        code = 'workOrder';
                    }
                    inputs = {sourceId: info.sourceId, action: info.action };
                }else if (info.sourceType === '隐患整改单') {
                    if (info.action === 'DSH' || info.action === 'DYR' || info.action === 'YJJ') {
                        code = 'orderExamine';
                    }
                    if (info.action === 'DFK' || info.action === 'HG' || info.action === 'BHG') {
                        code = 'enterpriseFeedback';
                    }
                    inputs = {sourceId: info.sourceId, action: info.action };
                }
                this.layoutComponent.toTab(code, inputs);
            }
        );
    }

    paginate(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.initData(event.page * this.max);
        }
    }
}
