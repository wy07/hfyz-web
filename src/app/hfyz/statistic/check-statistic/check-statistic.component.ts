import {Component, OnInit} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import DateTimeFormat = Intl.DateTimeFormat;
import {DatePipe} from '@angular/common';
import {TdLoadingService} from '@covalent/core';
import {RegularService} from '../../common/shared/regular.service';
import {StatisticService} from '../shared/statistic.service';
@Component({
  selector: 'app-check-statistic',
  templateUrl: './check-statistic.component.html',
  styleUrls: ['./check-statistic.component.css']
})
export class CheckStatisticComponent implements OnInit {
  checkStatisticList: any;
  edit: boolean;
  max: number;
  total: number;
  currentPage: number;
  company: string;
  startDate: any;
  endDate: any;
  date: string;
  showStartDate: boolean;
  showEndDate: boolean;
  sd: Date;
  ed: Date;
  formatStr: string;
    constructor(
     private _toastr: ToastsManager
    , private _statisticService: StatisticService
    , private _regularService: RegularService
    , private _datePipe: DatePipe
    , private _loadingService: TdLoadingService
    ) {
    this.max = 10;
    this.company = '';
    this.startDate = '';
    this.endDate = '';
    this.date = 'day';
    this.sd = null;
    this.ed = null;
    this.showStartDate = false;
    this.showEndDate = false;
  }

  ngOnInit() {
    this.initData();
  }

  initData(offset = 0) {
    this.showStartDate = false;
    this.showEndDate = false;
    if (!this.validation_search()) {
      return false;
    }
    this._loadingService.register();
    this._statisticService.checkList(this.max, offset, this.company, this.startDate, this.endDate).subscribe(
      res => {
        this._loadingService.resolve();
        this.checkStatisticList = res.checkStatisticList;
        this.total = res.total;
      }
    );
  }
  activeDateChange() {
      this.date === 'day' ? this.formatStr = 'yyyy-MM-dd' :
          (this.date === 'month' ? this.formatStr = 'yyyy-MM' : this.formatStr = 'yyyy')
      if (this.sd) {
          this.startDate = this.formatDate(this.sd, this.formatStr);
         this.showStartDate = false;
         this.sd = null;
      }
      if (this.ed) {
          this.endDate = this.formatDate(this.ed, this.formatStr);
          this.showEndDate = false;
          this.ed = null;
      }
  }
  formatDate(selectedDate, formatStr) {
      return  this._datePipe.transform(selectedDate, formatStr);
  }
  changeStartDate() {
      this.showStartDate = !this.showStartDate;
      if (this.showEndDate) {
          this.showEndDate = false;
      }
  }
  changeEndDate() {
      this.showEndDate = ! this.showEndDate;
      if (this.showStartDate) {
          this.showStartDate = false;
      }
    }
  paginate(event) {
    if (this.currentPage !== event.page) {
      this.currentPage = event.page;
      this.initData(this.max * event.page);
    }
  }
  validation_search() {
    const sd = new Date(this.startDate);
    const ed = new Date(this.endDate);
    if (!this._regularService.isBlank(sd) && !this._regularService.isBlank(ed)) {
      if (ed < sd) {
        this._toastr.info('请选择正确的日期！');
        return false;
      }
    }
    return true;
  }

  cancel() {
    this.company = '';
    this.startDate = '';
    this.endDate = '';
    this.date = 'day';
    this.sd = null;
    this.ed = null;
    this.showStartDate = false;
    this.showEndDate = false;
    this.initData();
  }

  clear() {
      this.startDate = '';
      this.endDate = '';
  }
}
