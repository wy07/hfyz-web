import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import DateTimeFormat = Intl.DateTimeFormat;
import { DatePipe } from '@angular/common';
import { TdLoadingService } from '@covalent/core';
import { RegularService } from '../../common/shared/regular.service';
import { HiddenRectificationOrderService } from '../shared/hidden-rectification-order.service';
import { zh } from '../../common/shared/zh';
import {CustomDialogService} from '../../common/shared/custom-dialog.service';

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

  pageMax: number;
  pageTotal: number;
  pageFirst: number;
  pageOffset: number;

  inspection: Date;
  dealine: Date;
  company: string;
  startDate: any;
  endDate: any;
  maxDate: any;
  isDetails: boolean;
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
  formData: FormData;
  file: boolean;
  fileSize: number;

  constructor(
    private _toastr: ToastsManager
    , private _hiddenRectificationOrderService: HiddenRectificationOrderService
    , private _regularService: RegularService
    , private _datePipe: DatePipe
    , private _loadingService: TdLoadingService
    , private _customDialogService: CustomDialogService
  ) {
    this.pageMax = 10;
    this.pageTotal = 0;
    this.pageFirst = 0;
    this.pageOffset = 0;

    this.edit = false;
    this.hiddenRectificationOrder = {};
    this.selectedCompany = {};
    this.clear();
    this.company = '';
    this.startDate = '';
    this.endDate = '';
    this.isDetails = false;
    this.maxDate = new Date();
    this.disabled = false;
    this.status = '';
    this.statusList = [{ label: '全部', value: '' }, { label: '起草', value: '0' },
    { label: '待审核', value: '1' }, { label: '待反馈', value: '2' }, { label: '已拒绝', value: '3' },
    { label: '待确认', value: '4' }, { label: '合格', value: '5' }, { label: '不合格', value: '6' }];
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
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
    this._hiddenRectificationOrderService.list(this.pageMax, this.pageFirst, this.company, sd, ed, status, this.listStatus).subscribe(
      res => {
        this._loadingService.resolve();
        this.hiddenRectificationOrderList = res.hiddenRectificationOrderList;
        this.pageTotal = res.total;
        this.pageOffset = this.pageFirst;
      }
    );
  }

  paginate(event) {
    if (this.pageOffset !== event.first) {
      this.initData();
    }
  }

  onSearch() {
    this.pageFirst = 0;
    this.pageOffset = 0;
    this.initData();
}

  onCreat() {
    this.inspection = null;
    this.dealine = null;
    this.clear();
    this.file = false;
    this.hiddenRectificationOrderTitle = '新增';
    this.isAdd = true;
    this.edit = true;
  }

  onSave() {
    if (this.validation()) {
      this.hiddenRectificationOrder.inspection = this._datePipe.transform(this.inspection, 'yyyy-MM-dd HH:mm');
      this.hiddenRectificationOrder.dealine = this._datePipe.transform(this.dealine, 'yyyy-MM-dd HH:mm');
      this.formData.append('hiddenRectificationOrder', JSON.stringify(this.hiddenRectificationOrder));
      this._loadingService.register();
      this._hiddenRectificationOrderService.save(this.formData).subscribe(
        res => {
          this._loadingService.resolve();
          this._toastr.success('保存成功！');
          this.initData();
          this.edit = false;
          this.formData = null;
        }
      );
    }
  }

    fileChangeEvent(fileInput: any) {
        this.file = false;
        const files = fileInput.target.files;
        this.hiddenRectificationOrder.fileName = '';
        if (files.length > 0) {
            this.formData = new FormData();
            this.file = true;
            this.fileSize = files[0].size;
            this.hiddenRectificationOrder.fileName = files[0].name;
            if (this.fileSize > this._hiddenRectificationOrderService.MAXFILESIZE ||
                this.fileSize <= this._hiddenRectificationOrderService.MINFILESIZE) {
                return;
            }
            this.formData.append('upload', files[0], files[0].fileName);
        }
    }
  onEdit(hiddenDanger) {
    this.clear();
    this.hiddenRectificationOrderTitle = '编辑';
    this.isAdd = false;
    this.edit = true;
    this.file = true;
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
          this._toastr.error('获取数据失败！');
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
      if (this._regularService.isBlank(this.formData)) {
          this.formData = new FormData();
      }
      this.hiddenRectificationOrder.inspection = this._datePipe.transform(this.inspection, 'yyyy-MM-dd HH:mm');
      this.hiddenRectificationOrder.dealine = this._datePipe.transform(this.dealine, 'yyyy-MM-dd HH:mm');
      delete this.hiddenRectificationOrder['status'];
      this.formData.append('hiddenRectificationOrder', JSON.stringify(this.hiddenRectificationOrder));
      this._loadingService.register();
      this._hiddenRectificationOrderService.update(this.hiddenRectificationOrder.id, this.formData).subscribe(
        res => {
          this._loadingService.resolve();
          this._toastr.success('修改成功！');
          this.initData();
          this.edit = false;
          this.formData = null;
        }
      );
    }
  }

  onDelete(hiddenRectificationOrder) {
      const msg = '确认删除隐患整改单号为【' + hiddenRectificationOrder.billNo + '】的记录吗？';
      const title = '删除';
      this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
          if (accept) {
              this._loadingService.register();
              this._hiddenRectificationOrderService.delete(hiddenRectificationOrder.id).subscribe(
                  res => {
                      this._loadingService.resolve();
                      this._toastr.info('删除成功！');
                      this.initData();
                  }
              )
          }
      })
  }
  commit(hiddenRectificationOrder) {
      const msg = '确认提交该隐患整改单？';
      const title = '提示';
      this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
          if (accept) {
              this._loadingService.register();
              this._hiddenRectificationOrderService.commit(hiddenRectificationOrder.id).subscribe(
                  res => {
                      this._loadingService.resolve();
                      this._toastr.success('提交成功！');
                      this.disabled = true;
                      this.initData();
                  }
              )
          }
      })
  }

  validation_search() {
    if (!this._regularService.isBlank(this.startDate) && !this._regularService.isBlank(this.endDate)) {
      if (this.endDate.getTime() === this.startDate.getTime()) {
        this._toastr.error('选择的日期不能相同！');
        return false;
      }
      if (this.endDate < this.startDate) {
        this._toastr.error('请选择正确的日期！');
        return false;
      }
    }
    return true;
  }
  validation() {
    if (this.selectedCompany.info !== this.ownerName || this._regularService.isBlank(this.selectedCompany.info)) {
      this._toastr.error('请选择正确的企业名称！');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenRectificationOrder.examiner)) {
      this._toastr.error('检查人不能为空！');
      return false;
    }
    if (this._regularService.isBlank(this.inspection)) {
      this._toastr.error('检查日期不能为空！');
      return false;
    }
    if (this._regularService.isBlank(this.dealine)) {
      this._toastr.error('整改期限不能为空！');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenRectificationOrder.insPosition)) {
      this._toastr.error('检查地点不能为空！');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenRectificationOrder.insDesc)) {
      this._toastr.error('检查内容不能为空！');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenRectificationOrder.insQuestion)) {
      this._toastr.error('存在问题不能为空！');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenRectificationOrder.proPosal)) {
      this._toastr.error('整改意见不能为空！');
      return false;
    }
    if (this.inspection.getTime() === this.dealine.getTime()) {
      this._toastr.error('选择的日期不能相同！');
      return false;
    }
    if (this.dealine < this.inspection) {
      this._toastr.error('请选择正确的日期！');
      return false;
    }
    if (!this.file) {
      this._toastr.error('请选择一个文件！');
      return false;
    }
    if (this.fileSize > this._hiddenRectificationOrderService.MAXFILESIZE) {
      this._toastr.error('选择的文件过大，请重新选择！');
      return false;
    }
    if (this.fileSize <= this._hiddenRectificationOrderService.MINFILESIZE) {
       this._toastr.error('文件内容不能为空，请重新选择！');
       return false;
    }
    return true;
  }

  clear() {
    this.hiddenRectificationOrder = {};
    this.selectedCompany = {};
  }

  onReset() {
    this.company = '';
    this.startDate = null;
    this.endDate = null;
    this.listStatus = '';
    this.pageFirst = 0;
    this.pageOffset = 0;
    this.initData();
  }

  back() {
    this.isDetails = false;
    this.edit = false;
  }
}
