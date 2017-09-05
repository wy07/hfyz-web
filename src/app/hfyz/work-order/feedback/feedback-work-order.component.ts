import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../shared/work-order.service';
import { TdLoadingService } from "@covalent/core";
import { RegularService } from "../../common/shared/regular.service";
import { ToastsManager } from "ng2-toastr";

@Component({
    selector: 'feedback-work-order',
    templateUrl: 'feedback-work-order.component.html',
    styleUrls: ['feedback-work-order.component.css']
})

export class FeedbackWorkOrderComponent implements OnInit {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    workOrderList: any;
    action: string;

    workOrder: any;

    note: string;
    constructor(private _workOrderService: WorkOrderService
        , private _loadingService: TdLoadingService
        , private _regularService: RegularService
        , private _toastr: ToastsManager) {
        this.workOrderList = [];
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.action = 'list';

        this.workOrder = {};

        this._workOrderService.change.subscribe((inputs: any) => {
            if (inputs.action === 'FK' && inputs.action === inputs.actualAction) {
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
            this._toastr.error('反馈内容不能为空');
            return false;
        }

        if (!confirm('确认提交反馈？')) {
            return false;
        }

        this._workOrderService.feedback(this.workOrder.id, { note: this.note }).subscribe(
            res => {
                this.action = 'list';
                this.initData();
            }
        );
    }
}
