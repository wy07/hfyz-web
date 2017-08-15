import { Component, OnInit } from '@angular/core';
import {WorkOrderService} from '../shared/work-order.service';
import {ToastsManager} from 'ng2-toastr';


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
  workOrderTitle:string ;
  isDetails:boolean ;
  woekOrder:any ;

  constructor(private _workOrderService: WorkOrderService,private _toastr: ToastsManager
  ) {
    this.workOrderList = [];
    this.max = 10;
    this.total = 0;
    this.isDetails = false;
    this.woekOrder = {};
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

  preEdit(id){
    this.workOrderTitle = '详情';
    this.isDetails = true ;
    this._workOrderService.details(id).subscribe(
      res => {
        if(res.result === 'success'){
          this.woekOrder = res.workOrder;
          console.log(this.woekOrder);  
        }else{
          this._toastr.error('获取数据失败');
        }
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
