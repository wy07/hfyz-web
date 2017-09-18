import { RegularService } from '../../common/shared/regular.service';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { PlatFormService } from './shared/plat-form.service';
import DateTimeFormat = Intl.DateTimeFormat;
import { DatePipe } from '@angular/common';
import { EventBuservice } from '../../common/shared/eventbus.service';
import { TdLoadingService } from '@covalent/core';
import { zh } from '../../common/shared/zh'

@Component({
    selector: 'plat-form',
    templateUrl: 'plat-form.component.html',
    styleUrls: ['plat-form.component.css']
})

export class PlatFormComponent implements OnInit {
    company: string;
    startDate: any;
    endDate: any;
    checkRecordList: any;

    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    flag: boolean;
    maxDate: any;
    inspectDisplay: boolean;
    inspectQ: any;
    zh = zh;

    constructor(private _toastr: ToastsManager
        , private _regularService: RegularService
        , private _platFormService: PlatFormService
        , private datePipe: DatePipe
        , private eventBuservice: EventBuservice
        , private _loadingService: TdLoadingService) {
        this.company = (sessionStorage.getItem('companyCode') === 'null') ? '' : sessionStorage.getItem('companyCode');
        this.startDate = '';
        this.endDate = '';
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.flag = false;
        this.maxDate = new Date();
        this.inspectDisplay = false;
        this.inspectQ = {};
    }

    ngOnInit() {
        this.initData();
    }

    validation() {
        if (!this._regularService.isBlank(this.startDate) && !this._regularService.isBlank(this.endDate)) {
            if (this.endDate.getTime() === this.startDate.getTime()) {
                this._toastr.error('选择的日期不能相同！');
                return false;
            }

            if (this.endDate < this.startDate) {
                this._toastr.error('请选择正确的日期！');
                return false;
            }
        }
        return true;
    }

    initData() {
        if (!this.validation()) {
            return false;
        }
        let sd = '';
        let ed = '';
        if (!this._regularService.isBlank(this.startDate)) {
            sd = this.datePipe.transform(this.startDate, 'yyyy-MM-dd HH:mm');
        }
        if (!this._regularService.isBlank(this.endDate)) {
            ed = this.datePipe.transform(this.endDate, 'yyyy-MM-dd HH:mm');
        }
        this._loadingService.register();
        this._platFormService.list(this.pageMax, this.pageFirst, this.company, sd, ed).subscribe(
            res => {
                this._loadingService.resolve();
                this.checkRecordList = res.checkResult.checkRecordList;
                this.pageTotal = res.checkResult.total;
                this.pageOffset = this.pageFirst;
            }
        );
    }

    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.initData();
        }
    }

    onSearch() {
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.initData();
    }

    onReset() {
        this.flag = true;
        this.company = '';
        this.startDate = null;
        this.endDate = null;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.initData();
    }

    onInspect() {
        this.inspectDisplay = true;
        this.inspectQ = {};
    }

    inspect() {
        if (this._regularService.isBlank(this.inspectQ.companyCode)) {
            this._toastr.error('业户组织机构代码不能为空！');
            return false;
        }

        if (this._regularService.isBlank(this.inspectQ.question)) {
            this._toastr.error('查岗问题不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.inspectQ.answer)) {
            this._toastr.error('查岗答案不能为空！');
            return false;
        }

        const $this = this;
        const address = 'inspect.manual.trigger';
        const data = {
            question: this.inspectQ.question
            , answer: this.inspectQ.answer
            , companyCode: this.inspectQ.companyCode
            , operator: 1
        };
        this.eventBuservice.inspectSend('inspect',address, data, res => {
            if (res.result === 'success') {
                $this._toastr.success('生成查岗成功！');
                $this.inspectDisplay = false;
            } else {
                $this._toastr.error('生成查岗失败！');
            }
        });
    }
}
