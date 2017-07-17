import { RegularService } from './../../common/shared/regular.service';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatFormService } from './shared/plat-form.service';
import DateTimeFormat = Intl.DateTimeFormat;
import {DatePipe} from '@angular/common';

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
  sd: any;
  ed: any;
  constructor(private _router: Router
    , private _activatedRoute: ActivatedRoute
    , private _toastr: ToastsManager
    , private _regularService: RegularService
    , private  _platFormService: PlatFormService
    , private datePipe: DatePipe
  ) {
    this.company = '';
    this.startDate = null;
    this.endDate = null;
    this.max = 10;
    this.total = 0;
    this.flag = false;
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.initData();
  }
  validation() {
    if (this.startDate !== null && this.endDate !== null && this.endDate.getTime() === this.startDate.getTime()) {
      this._toastr.info('选择的日期不能相同！');
      return false;
    }
    if (this.endDate !== null && this.startDate !== null && this.endDate < this.startDate) {
      this._toastr.info('请选择正确的日期！');
      return false;
    }
    return true;
  }
  initData(offset = 0) {
    if (this.validation()) {
        this.sd = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
      if (this.endDate !== null) {
        this.ed = this.endDate.getFullYear() + '-' + this.endDate.getMonth() + 1 + '-' + this.endDate.getDate() + 1;
      }
      this._platFormService.list(this.max, offset, this.company, this.sd, this.ed).subscribe(
        res => {
          this.checkRecordList = res.checkResult.checkRecordList;
          this.total = res.checkResult.total;
        }
      );
    }
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
}
