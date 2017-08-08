import {Component, OnInit} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import DateTimeFormat = Intl.DateTimeFormat;
import {DatePipe} from '@angular/common';
import {TdLoadingService} from '@covalent/core';
import {RegularService} from '../../common/shared/regular.service';
import {HiddenRectificationOrderService} from '../shared/hidden-rectification-order.service';
@Component({
  selector: 'app-order-examine',
  templateUrl: './order-examine.component.html',
  styleUrls: ['./order-examine.component.css']
})
export class OrderExamineComponent implements OnInit {
  hiddenRectificationOrderList: any;
  hiddenRectificationOrder: any;
  edit: boolean;
  hiddenRectificationOrderTitle: string;
  max: number;
  total: number;
  currentPage: number;
  inspection: Date;
  dealine: Date;
  company: string;
  startDate: any;
  endDate: any;
  maxDate: any;
  isDetails: boolean;
  displayDialog: boolean;
  disabled: boolean;
  enterpirse: any;
  placeholder: any;
  approveDesc: any;
  approveTime: Date;
  tempStatus: any;
  reviewAndApproval: any;
  reviewAndApprovalList: any[];
  statusList: any[];
  listStatus: any;
  constructor(
     private _toastr: ToastsManager
    , private _hiddenRectificationOrderService: HiddenRectificationOrderService
    , private _regularService: RegularService
    , private _datePipe: DatePipe
    , private _loadingService: TdLoadingService
    ) {
    this.edit = false;
    this.hiddenRectificationOrder = {};
    this.clear();
    this.max = 10;
    this.company = '';
    this.startDate = '';
    this.endDate = '';
    this.isDetails = false;
    this.maxDate = new Date();
    this.displayDialog = false;
    this.disabled = false;
    this.approveTime = new Date();
    this.statusList = [{ label: '全部', value: '' }, { label: '待审核', value: '1' },
      { label: '待反馈', value: '2' }, { label: '待确认', value: '4' }]
  }

  ngOnInit() {
    this.initData();
  }

  initData(offset = 0) {
    if (!this.validation_search()) {
      return false;
    }
    let sd = '';
    let ed = '';
    if (!this._regularService.isBlank(this.startDate)) {
      sd = this._datePipe.transform(this.startDate, 'yyyy-MM-dd HH:mm');
    }
    if (!this._regularService.isBlank(this.endDate)) {
      ed = this._datePipe.transform(this.endDate, 'yyyy-MM-dd HH:mm');
    }
    this._loadingService.register();
    this._hiddenRectificationOrderService.list(this.max, offset, this.company, sd, ed, 'SH', this.listStatus).subscribe(
      res => {
        this._loadingService.resolve();
        this.hiddenRectificationOrderList = res.hiddenRectificationOrderList;
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

  onSave() {
    if (this.validation()) {
      const time = this._datePipe.transform(this.approveTime, 'yyyy-MM-dd HH:mm');
      this._loadingService.register();
      this._hiddenRectificationOrderService.saveApproval(this.hiddenRectificationOrder.id, time,
      this.approveDesc, this.tempStatus).subscribe(
        res => {
          this._loadingService.resolve();
          this._toastr.success('提交成功');
          this.initData();
          this.edit = false;
        }
      );
    }
    this.displayDialog = false;
  }

  onEdit(hiddenDanger) {
    this.approveTime = new Date();
    this.clear();
    this.hiddenRectificationOrderTitle = '审核隐患整改单';
    this.edit = true;
    this.preEdit(hiddenDanger.id);
  }

  getReviewAndApprovalList(id) {
    this._hiddenRectificationOrderService.reviewAndApprovalList(id).subscribe(
      res => {
        this.reviewAndApprovalList = res.reviewAndApprovalList;
      }
    );
  }
  preEdit(id) {
    if (this.edit === false) {
      this.isDetails = true;
      this.hiddenRectificationOrderTitle = '隐患整改单详情';
    }
    this._loadingService.register();
    this._hiddenRectificationOrderService.edit(id).subscribe(
      res => {
        this._loadingService.resolve();
        if (res.result === 'success') {
          this.hiddenRectificationOrder = res.hiddenRectificationOrder;
          this.placeholder = res.hiddenRectificationOrder.enterpirse;
          this.inspection = new Date(this.hiddenRectificationOrder.inspectionDate);
          this.dealine = new Date(this.hiddenRectificationOrder.dealineDate);
          delete this.hiddenRectificationOrder['inspectionDate'];
          delete this.hiddenRectificationOrder['dealineDate'];
        } else {
          this._toastr.error('获取数据失败');
        }
      }
    );
    this.getReviewAndApprovalList(id);
  }
  onSure() {
    this._loadingService.register();
    this._hiddenRectificationOrderService.onSure(this.hiddenRectificationOrder.id, this.tempStatus).subscribe(
      res => {
        this._loadingService.resolve();
        this._toastr.success('确认成功');
        this.initData();
        this.edit = false;
      }
    );
  }
  validation_search() {
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
  validation() {
    if (this.hiddenRectificationOrder.status === '待审核' && this._regularService.isBlank(this.approveDesc)) {
      this._toastr.info('请填写审核意见！');
      return false;
    }
    if (this._regularService.isBlank(this.tempStatus)) {
      this._toastr.info('请选择结果！');
      return false;
    }
    return true;
  }

  clear() {
    this.hiddenRectificationOrder = {};
    this.approveDesc = '';
    this.tempStatus = '';
    this.approveTime = new Date();
  }

  cancel() {
    this.company = '';
    this.startDate = null;
    this.endDate = null;
    this.listStatus = '';
    this.initData();
  }

  return() {
    this.isDetails = false;
    this.edit = false;
  }

  onCancel() {
    this.displayDialog = false;
  }

  onSaveNew() {
    if (this.validation()) {
      this.displayDialog = true;
    }
  }
}
