import {Component, OnInit} from '@angular/core';
import {WorkOrderService} from '../shared/work-order.service';
import {TdLoadingService} from "@covalent/core";
import {RegularService} from "../../common/shared/regular.service";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'feedback-work-order',
    templateUrl: 'feedback-work-order.component.html',
    styleUrls: ['feedback-work-order.component.css']
})

export class FeedbackWorkOrderComponent implements OnInit {
    workOrderList: any;
    currentPage: number;
    max: any;
    total: any;
    action: string;

    workOrder: any;

    note:string;

    constructor(private _workOrderService: WorkOrderService
        , private _loadingService: TdLoadingService
        , private _regularService: RegularService
        , private _toastr: ToastsManager) {
        this.workOrderList = [];
        this.max = 10;
        this.total = 0;
        this.action = 'list';
        this.currentPage=0;

        this.workOrder={};
    }

    ngOnInit() {
        this.initData();
    }

    initData(offset = 0) {
        this._loadingService.register();
        this._workOrderService.feedbackList(this.max, offset).subscribe(
            res => {
                this._loadingService.resolve();
                this.workOrderList = res.workOrderList;
                this.total = res.total;
            }
        );
    }

    paginate(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.initData(this.max * event.page);
        }
    }

    onFeedback(id) {
        this.note='';
        this._workOrderService.preFeedback(id).subscribe(
            res => {
                this.workOrder = res.workOrder;
                this.action='feedback';
            }
        );
    }

    submitFeedback(){
        if (this._regularService.isBlank(this.note)) {
            this._toastr.error('反馈内容不能为空');
            return false;
        }

        if (!confirm('确认提交反馈？')) {
            return false;
        }

        this._workOrderService.feedback(this.workOrder.id,{note:this.note}).subscribe(
            res => {
                this.action='list';
                this.initData(this.max * this.currentPage);
            }
        );
    }
}
