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
  constructor(private _router: Router
    , private _activatedRoute: ActivatedRoute
    , private _toastr: ToastsManager
    , private _regularService: RegularService
    , private  _platFormService: PlatFormService
    , private datePipe: DatePipe
  ) {
    this.company = '';
    this.startDate = '';
    this.endDate = '';
    this.max = 10;
    this.total = 0;
  }

  ngOnInit() {
    this.initData();
  }


  initData(offset = 0) {
    const sd = this.datePipe.transform( this.startDate, 'yyyy-MM-dd');
    const ed = this.datePipe.transform( this.endDate, 'yyyy-MM-dd');
    this._platFormService.list(this.max, offset, this.company, sd, ed).subscribe(
      res => {
        this.checkRecordList = res.checkRecordList;
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
}
