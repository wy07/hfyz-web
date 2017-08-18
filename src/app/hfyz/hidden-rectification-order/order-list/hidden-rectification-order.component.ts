import {Component, OnInit} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import DateTimeFormat = Intl.DateTimeFormat;
import {DatePipe} from '@angular/common';
import {TdLoadingService} from '@covalent/core';
import {RegularService} from '../../common/shared/regular.service';
import {HiddenRectificationOrderService} from '../shared/hidden-rectification-order.service';
import {zh} from '../../common/shared/zh';

@Component({
  selector: 'app-hidden-rectification-order',
  templateUrl: './hidden-rectification-order.component.html',
  styleUrls: ['./hidden-rectification-order.component.css']
})
export class HiddenRectificationOrderComponent implements OnInit {
  hiddenRectificationOrderList: any;
  hiddenRectificationOrder: any;
  edit: boolean;
  hiddenRectificationOrderTitle: string;
  isAdd: boolean;
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
  enterpirse: string;
  filteredEnterpirses: any[];
  status: any;
  reviewAndApprovalList: any[];
  statusList: any[];
  listStatus: any;
  selectedCompany: any;
  ownerName: string;
  zh = zh;
  constructor(
     private _toastr: ToastsManager
    , private _hiddenRectificationOrderService: HiddenRectificationOrderService
    , private _regularService: RegularService
    , private _datePipe: DatePipe
    , private _loadingService: TdLoadingService
    ) {
    this.edit = false;
    this.hiddenRectificationOrder = {};
    this.selectedCompany = {};
    this.clear();
    this.max = 10;
    this.company = '';
    this.startDate = '';
    this.endDate = '';
    this.isDetails = false;
    this.maxDate = new Date();
    this.displayDialog = false;
    this.disabled = false;
    this.status = '';
    this.statusList = [{ label: '全部', value: '' }, { label: '起草', value: '0' },
      { label: '待审核', value: '1' }, { label: '待反馈', value: '2' }, { label: '已拒绝', value: '3' },
      { label: '待确认', value: '4' }, { label: '合格', value: '5' }, { label: '不合格', value: '6' }];
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
    this._hiddenRectificationOrderService.list(this.max, offset, this.company, sd, ed, status, this.listStatus).subscribe(
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

  onCreat() {
    this.inspection = null;
    this.dealine = null;
    this.clear();
    this.hiddenRectificationOrderTitle = '新增';
    this.isAdd = true;
    this.edit = true;
  }

  onSave() {
    if (this.validation()) {
      this.hiddenRectificationOrder.inspection = this._datePipe.transform(this.inspection, 'yyyy-MM-dd HH:mm');
      this.hiddenRectificationOrder.dealine = this._datePipe.transform(this.dealine, 'yyyy-MM-dd HH:mm');
      this._loadingService.register();
      this._hiddenRectificationOrderService.save(this.hiddenRectificationOrder).subscribe(
        res => {
          this._loadingService.resolve();
          this._toastr.success('保存成功');
          this.initData();
          this.edit = false;
        }
      );
    }
    this.displayDialog = false;
  }

  onEdit(hiddenDanger) {
    this.clear();
    this.hiddenRectificationOrderTitle = '编辑';
    this.isAdd = false;
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
      this.hiddenRectificationOrderTitle = '详情';
    }
    this._loadingService.register();
    this._hiddenRectificationOrderService.edit(id).subscribe(
      res => {
        this._loadingService.resolve();
        if (res.result === 'success') {
          this.hiddenRectificationOrder = res.hiddenRectificationOrder;
          this.selectedCompany.info = res.hiddenRectificationOrder.enterpirse;
          this.ownerName = res.hiddenRectificationOrder.enterpirse;
          this.hiddenRectificationOrder.companyCode = res.hiddenRectificationOrder.companyCode;
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
  filteredEnterpirse(event) {
    const query = event.query.trim();
    if (this._regularService.isBlank(query)) {
      return false;
    }

    this._hiddenRectificationOrderService.companyList(query).subscribe(
      res => {
        this.filteredEnterpirses = res.companyList;
        for (const item of this.filteredEnterpirses) {
          item.info = `${item.ownerName}`;
        }
      }
    );
  }
  onSelect(event) {
      this.hiddenRectificationOrder.companyCode = event.companyCode;
      this.ownerName = event.ownerName;
  }
  update() {
    if (this.validation()) {
      this.hiddenRectificationOrder.inspection = this._datePipe.transform(this.inspection, 'yyyy-MM-dd HH:mm');
      this.hiddenRectificationOrder.dealine = this._datePipe.transform(this.dealine, 'yyyy-MM-dd HH:mm');
      delete this.hiddenRectificationOrder['status'];
      this._loadingService.register();
      this._hiddenRectificationOrderService.update(this.hiddenRectificationOrder.id, this.hiddenRectificationOrder).subscribe(
        res => {
          this._loadingService.resolve();
          this._toastr.success('保存成功');
          this.initData();
          this.edit = false;
        }
      );
    }
    this.displayDialog = false;
  }

  onDelete(hiddenRectificationOrder) {
    if (confirm('确认移除编号为："' + hiddenRectificationOrder.billNo + '"的隐患整改单？')) {
      this._loadingService.register();
      this._hiddenRectificationOrderService.delete(hiddenRectificationOrder.id).subscribe(
        res => {
          this._loadingService.resolve();
          this.initData();
          this._toastr.info('移除数据成功');
        }
      );
    }
  }
  commit(hiddenRectificationOrder) {
    if (confirm('确认提交编号为："' + hiddenRectificationOrder.billNo + '"的隐患整改单？')) {
      this._loadingService.register();
      this._hiddenRectificationOrderService.commit(hiddenRectificationOrder.id).subscribe(
        res => {
          this._loadingService.resolve();
          this.disabled = true;
          this.initData();
          this._toastr.info('提交成功');
        }
      );
    }
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
    if (this.selectedCompany.info !== this.ownerName || this._regularService.isBlank(this.selectedCompany.info)) {
    this._toastr.info('请选择正确的企业名称');
    return false;
    }
    if (this._regularService.isBlank(this.hiddenRectificationOrder.examiner)) {
      this._toastr.info('检查人不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.inspection)) {
      this._toastr.info('检查日期不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.dealine)) {
      this._toastr.info('整改期限不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenRectificationOrder.insPosition)) {
      this._toastr.info('检查地点不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenRectificationOrder.insDesc)) {
      this._toastr.info('检查内容不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenRectificationOrder.insQuestion)) {
      this._toastr.info('存在问题不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenRectificationOrder.proPosal)) {
      this._toastr.info('整改意见不能为空');
      return false;
    }
    if (this.inspection.getTime() === this.dealine.getTime()) {
      this._toastr.info('选择的日期不能相同！');
      return false;
    }
    if (this.dealine < this.inspection) {
      this._toastr.info('请选择正确的日期！');
      return false;
    }
    return true;
  }

  clear() {
    this.hiddenRectificationOrder = {};
    this.selectedCompany = {};
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
