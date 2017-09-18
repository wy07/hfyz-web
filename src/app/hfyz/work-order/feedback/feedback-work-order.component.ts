import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkOrderService } from '../shared/work-order.service';
import { TdLoadingService } from "@covalent/core";
import { RegularService } from "../../common/shared/regular.service";
import { ToastsManager } from "ng2-toastr";
import {AppEventEmittersService} from '../../common/shared/app-event-emitters.service';
import {CustomDialogService} from '../../common/shared/custom-dialog.service';

@Component({
    selector: 'feedback-work-order',
    templateUrl: 'feedback-work-order.component.html',
    styleUrls: ['feedback-work-order.component.css']
})

export class FeedbackWorkOrderComponent implements OnInit, OnDestroy {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    workOrderList: any;
    action: string;
    workOrder: any;
    note: string;
    subscription: any;
    constructor(private _workOrderService: WorkOrderService
        , private _loadingService: TdLoadingService
        , private _regularService: RegularService
        , private _toastr: ToastsManager
        , private _appEmitterService: AppEventEmittersService
        , private _customDialogService: CustomDialogService) {
        this.workOrderList = [];
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.action = 'list';

        this.workOrder = {};

        this.subscription = _appEmitterService.tabChange.subscribe((inputs: any) => {
            if (inputs.code === 'feedbackWorkOrder' && inputs.action === 'DFK') {
                this.onFeedback(inputs.sourceId);
            }
        });
    }

    ngOnInit() {
        this.initData();
    }

    initData() {
        this._loadingService.register();
        this._workOrderService.feedbackList(this.pageMax, this.pageFirst).subscribe(
            res => {
                this._loadingService.resolve();
                this.workOrderList = res.workOrderList;
                this.pageTotal = res.total;
                this.pageOffset = this.pageFirst;
            }
        );
    }

    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.initData();
        }
    }

    onFeedback(id) {
        this.note = '';
        this._workOrderService.preFeedback(id).subscribe(
            res => {
                this.workOrder = res.workOrder;
                this.action = 'feedback';
            }
        );
    }

    submitFeedback() {
        if (this._regularService.isBlank(this.note)) {
            this._toastr.error('反馈内容不能为空！');
            return false;
        }
        const msg = '确认反馈该工单？';
        const title = '提示';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._workOrderService.feedback(this.workOrder.id, { note: this.note }).subscribe(res => {
                    this._loadingService.resolve();
                    this._toastr.success('反馈成功！');
                    this.action = 'list';
                    this.initData();
                })
            }
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
