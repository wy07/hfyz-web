import { RegularService } from './../../common/shared/regular.service';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatFormService } from './shared/plat-form.service';
import DateTimeFormat = Intl.DateTimeFormat;
import { DatePipe } from '@angular/common';
import { EventBuservice } from '../../common/shared/eventbus.service';

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
  max: number;
  total: number;
  currentPage: number;
  flag: boolean;
  maxDate: any;
  inspectDisplay: boolean;
  inspectQ: any;

  constructor(private _router: Router
    , private _activatedRoute: ActivatedRoute
    , private _toastr: ToastsManager
    , private _regularService: RegularService
    , private _platFormService: PlatFormService
    , private datePipe: DatePipe
    , private eventBuservice: EventBuservice) {
    this.company = '';
    this.startDate = '';
    this.endDate = '';
    this.max = 10;
    this.total = 0;
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
        this._toastr.info('选择的日期不能相同！');
        return false;
      }

      if (this.endDate < this.startDate) {
        this._toastr.info('请选择正确的日期！');
        return false;
      }
    }
    return true;
  }

  initData(offset = 0) {
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
    this._platFormService.list(this.max, offset, this.company, sd, ed).subscribe(
      res => {
        this.checkRecordList = res.checkResult.checkRecordList;
        this.total = res.checkResult.total;
      }
    );
  }

  paginate(event) {
    if (this.currentPage !== event.page) {
      this.currentPage = event.page;
      this.initData(this.max * event.page);
    }
  }

  cancel() {
    this.flag = true;
    this.company = '';
    this.startDate = null;
    this.endDate = null;
    this.initData();
  }

  onInspect() {
    this.inspectDisplay = true;
    this.inspectQ = {};
  }

  inspect() {
    if (this._regularService.isBlank(this.inspectQ.companyCode)) {
      this._toastr.info('业户组织机构代码不能为空！');
      return false;
    }

    if (this._regularService.isBlank(this.inspectQ.question)) {
      this._toastr.info('查岗问题不能为空！');
      return false;
    }
    if (this._regularService.isBlank(this.inspectQ.answer)) {
      this._toastr.info('查岗答案不能为空！');
      return false;
    }

    const $this = this;
    const eb = this.eventBuservice.getEb();
    eb.send('inspect.manual.trigger'
      , {
        question: this.inspectQ.question
        , answer: this.inspectQ.answer
        , companyCode: this.inspectQ.companyCode
        , operator: 1
      }
      , function (err, res) {
        console.log('inspect.manual.trigger====callback');
        console.log(JSON.stringify(res))
        if (res.body.result === 'success') {
          $this._toastr.info('生成查岗成功');
          $this.inspectDisplay = false;
        } else {
          $this._toastr.error('生成查岗失败');
        }
      });
  }
}
