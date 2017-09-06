import { TdLoadingService } from '@covalent/core';
import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../shared/work-order.service';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'work-order',
  templateUrl: 'work-order.component.html',
  styleUrls: ['work-order.component.css']
})

export class WorkOrderComponent implements OnInit {
  pageMax: number;
  pageTotal: number;
  pageFirst: number;
  pageOffset: number;

  workOrderList: any;
  workOrderTitle: string;
  isDetails: boolean;
  workOrder: any;
  sn: string;
  alarmType: string;
  alarmLevel: string;
  companyCode: string;
  ownerName: string;
  operateManager: string;
  phone: string;
  frameNo: string;
  userID: string;

  flows: any;
  flowStep: number;
  todoRole: string;
  dateCreated: Date;
  lastUpdated: Date;
  checkTime: Date;
  rectificationTime: Date;
  note: string;
  status: string

  workOrderRecords: any[];
  constructor(private _workOrderService: WorkOrderService
    , private _toastr: ToastsManager
    , private _loadingService: TdLoadingService
  ) {
    this.workOrderList = [];
    this.pageMax = 10;
    this.pageTotal = 0;
    this.pageFirst = 0;
    this.pageOffset = 0;
    this.isDetails = false;
    this.workOrder = {};
    this.workOrderRecords = [];
  }

  ngOnInit() {
    this.initData();
  }
  initData(offset = 0) {
    this._loadingService.register();
    this._workOrderService.list(this.pageMax, this.pageFirst).subscribe(
      res => {
        this._loadingService.resolve();
        this.workOrderList = res.workOrderList;
        this.pageTotal = res.total;
        this.pageOffset = this.pageFirst;
      }
    );
  }

  preEdit(id) {
    this.workOrderTitle = '详情';
    this.isDetails = true;
    this._workOrderService.details(id).subscribe(
      res => {
        if (res.result === 'success') {
          this.workOrder = res.workOrder;
          this.workOrderRecords = res.workOrderRecords ? res.workOrderRecords : [];
        } else {
          this._toastr.error('获取数据失败');
        }
      }
    );
  }

  back() {
    this.isDetails = false;
  }

  paginate(event) {
    if (this.pageOffset !== event.first) {
      this.initData();
    }
  }
}
