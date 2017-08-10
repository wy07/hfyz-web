import {Component, OnInit} from '@angular/core';
import {WorkOrderService} from '../shared/work-order.service';
import {TdLoadingService} from "@covalent/core";
import {RegularService} from "../../common/shared/regular.service";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'pending-work-order',
    templateUrl: 'pending-work-order.component.html',
    styleUrls: ['pending-work-order.component.css']
})

export class PendingWorkOrderComponent implements OnInit {
    workOrderList: any;
    currentPage: number;
    max: any;
    total: any;
    action: string;

    workOrder: any;
    workOrderRecords: any[];

    examineNote: string;
    judgeNote: string;

    constructor(private _workOrderService: WorkOrderService
        , private _loadingService: TdLoadingService
        , private _regularService: RegularService
        , private _toastr: ToastsManager) {
        this.workOrderList = [];
        this.max = 10;
        this.total = 0;
        this.action = 'list';
        this.currentPage = 0;

        this.workOrderRecords = [];
        this.workOrder = {};
    }

    ngOnInit() {
        this.initData();
    }

    initData(offset = 0) {
        this._loadingService.register();
        this._workOrderService.pendinglist(this.max, offset).subscribe(
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

    onExamine(id) {
        this.examineNote = '';
        this._workOrderService.preExamine(id).subscribe(
            res => {
                this.workOrder = res.workOrder;
                this.workOrderRecords = res.workOrderRecords;
                this.action = 'examine';
            }
        );
    }

    submitExamine(result) {
        if (this._regularService.isBlank(this.examineNote)) {
            this._toastr.error('审批内容不能为空');
            return false;
        }

        if (!confirm('确认提交审批？')) {
            return false;
        }

        this._workOrderService.examine(this.workOrder.id, {note: this.examineNote, result: result}).subscribe(
            res => {
                this.action = 'list';
                this.initData(this.max * this.currentPage);
            }
        );
    }

    onJudge(id) {
        this.judgeNote = '';
        this._workOrderService.preJudge(id).subscribe(
            res => {
                this.workOrder = res.workOrder;
                this.workOrderRecords = res.workOrderRecords;
                this.action = 'judge';
            }
        );
    }

    submitJudge(result){
        if (this._regularService.isBlank(this.judgeNote)) {
            this._toastr.error('研判内容不能为空');
            return false;
        }

        if (!confirm('确认提交研判？')) {
            return false;
        }

        this._workOrderService.judge(this.workOrder.id, {note: this.judgeNote, result: result}).subscribe(
            res => {
                this.action = 'list';
                this.initData(this.max * this.currentPage);
            }
        );
    }
}
