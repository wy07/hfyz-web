import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../shared/work-order.service';
import { TdLoadingService } from "@covalent/core";
import { RegularService } from "../../common/shared/regular.service";
import { ToastsManager } from "ng2-toastr";

@Component({
    selector: 'pending-work-order',
    templateUrl: 'pending-work-order.component.html',
    styleUrls: ['pending-work-order.component.css']
})

export class PendingWorkOrderComponent implements OnInit {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    workOrderList: any;
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
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.action = 'list';

        this.workOrderRecords = [];
        this.workOrder = {};
    }

    ngOnInit() {
        this.initData();
    }

    initData() {
        this._loadingService.register();
        this._workOrderService.pendinglist(this.pageMax, this.pageFirst).subscribe(
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

        this._workOrderService.examine(this.workOrder.id, { note: this.examineNote, result: result }).subscribe(
            res => {
                this.action = 'list';
                this.initData();
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

    submitJudge(result) {
        if (this._regularService.isBlank(this.judgeNote)) {
            this._toastr.error('研判内容不能为空');
            return false;
        }

        if (!confirm('确认提交研判？')) {
            return false;
        }

        this._workOrderService.judge(this.workOrder.id, { note: this.judgeNote, result: result }).subscribe(
            res => {
                this.action = 'list';
                this.initData();
            }
        );
    }
}
