import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import DateTimeFormat = Intl.DateTimeFormat;
import {WorkOrderService} from './shared/work-order.service';

@Component({
  selector: 'work-order',
  templateUrl: 'work-order.component.html',
  styleUrls: ['work-order.component.css']
})

export class WorkOrderComponent implements OnInit {
  workOrderList: any;
  currentPage: number;
  max: any;
  total: any;
  constructor(private _toastr: ToastsManager
    , private _workOrderService: WorkOrderService
  ) {
    this.workOrderList = [];
    this.max = 10;
    this.total = 0;
  }

  ngOnInit() {
    this.initData();
  }
  initData(offset = 0) {
    this._workOrderService.list(this.max, offset).subscribe(
      res => {
        this.workOrderList = res.resultList.workOrderList;
        this.total = res.resultList.total;
        console.log('========workOrderList==============' + JSON.stringify(this.workOrderList));
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
