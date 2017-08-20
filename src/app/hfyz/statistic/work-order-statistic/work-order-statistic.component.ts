import { Component, OnInit } from '@angular/core';
import { SystemCodeService } from "../../basic/systemCode/shared/system-code.service";
import { RegularService } from "../../common/shared/regular.service";
import { TdLoadingService } from "@covalent/core";
import { WorkOrderService } from "../../work-order/shared/work-order.service";
import { ToastsManager } from "ng2-toastr";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-work-order-statistic',
    templateUrl: 'work-order-statistic.component.html',
    styleUrls: ['work-order-statistic.component.css']
})
export class WorkOrderStatisticComponent implements OnInit {
    records: any[];
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    companyName: string;
    alarmTypes: any[];
    startDate: Date;
    endDate: Date;
    alarmType: any;


    constructor(private _systemCodeService: SystemCodeService
        , private _regularService: RegularService
        , private _workOrderService: WorkOrderService
        , private _loadingService: TdLoadingService
        , private _toastr: ToastsManager
        , private _datePipe: DatePipe) {
        this.alarmType = '';
        this.startDate = new Date();
        this.endDate = new Date();
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
    }

    ngOnInit() {
        this.getAlarmTypes();
    }

    getAlarmTypes() {
        this._systemCodeService.alarmTypeList().subscribe(
            res => {
                this.alarmTypes = res.alarmTypes;
            }
        )
    }

    onSearch() {
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.statistic();
    }

    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.statistic();
        }
    }

    statistic() {
        const params = { max: this.pageMax, offset: this.pageFirst };
        if (this._regularService.isBlank(this.startDate)) {
            this._toastr.error('请选择起始时间');
            return;
        }
        if (this._regularService.isBlank(this.endDate)) {
            this._toastr.error('请选择终止时间');
            return;
        }

        if (this.endDate < this.startDate) {
            this._toastr.error('终止时间不能小于起始时间');
            return;
        }
        params['startDate'] = this._datePipe.transform(this.startDate, 'yyyy-MM-dd');
        params['endDate'] = this._datePipe.transform(this.endDate, 'yyyy-MM-dd');

        if (!this._regularService.isBlank(this.companyName)) {
            params['companyName'] = this.companyName;
        }
        if (!this._regularService.isBlank(this.alarmType)) {
            params['alarmType'] = this.alarmType;
        }


        this._loadingService.register();
        this._workOrderService.statistic(params).subscribe(
            res => {
                this._loadingService.resolve();
                this.records = res.statisticList;
                this.pageTotal = res.statisticCount;
                this.pageOffset = this.pageFirst;
            }
        )
    }

    onReset() {
        this.records = [];
        this.pageFirst = 0;
        this.pageOffset = 0;

        this.alarmType = '';
        this.startDate = new Date();
        this.endDate = new Date();
        this.companyName = '';
    }

}
