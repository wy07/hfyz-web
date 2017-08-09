import { Component, OnInit } from '@angular/core';
import {WorkOrderService} from '../shared/work-order.service';

@Component({
  selector: 'work-order',
  templateUrl: 'work-order.component.html'
})

export class PendingWorkOrderComponent implements OnInit {
  workOrderList: any;
  currentPage: number;
  max: any;
  total: any;
  constructor(private _workOrderService: WorkOrderService
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
}
