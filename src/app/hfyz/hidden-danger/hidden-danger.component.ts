import {Component, OnInit} from '@angular/core';
import {RegularService} from './../common/shared/regular.service';
import {ToastsManager} from 'ng2-toastr';
import {HiddenDangerService} from './shared/hidden-danger.service';
import DateTimeFormat = Intl.DateTimeFormat;
import { DatePipe } from '@angular/common';
import {TdLoadingService} from '@covalent/core';
@Component({
  selector: 'app-hidden-danger',
  templateUrl: './hidden-danger.component.html',
  styleUrls: ['./hidden-danger.component.css']
})
export class HiddenDangerComponent implements OnInit {
  hiddenDangerList: any;
  hiddenDanger: any;
  edit: boolean;
  hiddenDangerTitle: string;
  isAdd: boolean;
  max: number;
  total: number;
  currentPage: number;
  inspection: Date;
  dealine: Date;
  reply: Date;
  company: string;
  startDate: any;
  endDate: any;
  maxDate: any;
  isDetails: boolean;
  displayDialog: boolean;
  constructor(
     private _toastr: ToastsManager
    , private _hiddenDangerService: HiddenDangerService
    , private _regularService: RegularService
    , private _datePipe: DatePipe
    , private _loadingService: TdLoadingService
    ) {
    this.edit = false;
    this.hiddenDanger = {};
    this.clear();
    this.max = 10;
    this.company = '';
    this.startDate = '';
    this.endDate = '';
    this.isDetails = false;
    this.maxDate = new Date();
    this.reply = null;
    this.displayDialog = false;
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
    this._hiddenDangerService.list(this.max, offset, this.company, sd, ed).subscribe(
      res => {
        this._loadingService.resolve();
        this.hiddenDangerList = res.hiddenDangerList;
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
    this.reply = null;
    this.clear();
    this.hiddenDangerTitle = '新增隐患整改单';
    this.isAdd = true;
    this.edit = true;
  }

  onSave() {
    if (this.validation()) {
      this.hiddenDanger.inspection = this._datePipe.transform(this.inspection, 'yyyy-MM-dd HH:mm');
      this.hiddenDanger.dealine = this._datePipe.transform(this.dealine, 'yyyy-MM-dd HH:mm');
      this._loadingService.register();
      this._hiddenDangerService.save(this.hiddenDanger).subscribe(
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
    this.hiddenDangerTitle = '编辑隐患整改单';
    this.isAdd = false;
    this.edit = true;
    this.preEdit(hiddenDanger.id);
  }

  preEdit(id) {
    if (this.edit === false) {
      this.isDetails = true;
      this.hiddenDangerTitle = '隐患整改单详情';
    }
    this._loadingService.register();
    this._hiddenDangerService.edit(id).subscribe(
      res => {
        this._loadingService.resolve();
        if (res.result === 'success') {
          this.hiddenDanger = res.hiddenDanger;
          this.inspection = new Date(this.hiddenDanger.inspectionDate);
          this.dealine = new Date(this.hiddenDanger.dealineDate);
          delete this.hiddenDanger['inspectionDate'];
          delete this.hiddenDanger['dealineDate'];
          if (this.hiddenDanger.replyDate !== null) {
            this.reply = new Date(this.hiddenDanger.replyDate)
            delete this.hiddenDanger['replyDate'];
          }
        } else {
          this._toastr.error('获取数据失败');
        }
      }
    );
  }

  update() {
    if (this.validation()) {
      this.hiddenDanger.inspection = this._datePipe.transform(this.inspection, 'yyyy-MM-dd HH:mm');
      this.hiddenDanger.dealine = this._datePipe.transform(this.dealine, 'yyyy-MM-dd HH:mm');
      this.hiddenDanger.reply = this._datePipe.transform(this.reply, 'yyyy-MM-dd HH:mm');
      this._loadingService.register();
      this._hiddenDangerService.update(this.hiddenDanger.id, this.hiddenDanger).subscribe(
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

  onDelete(hiddenDanger) {
    if (confirm('确认移除编号为："' + hiddenDanger.billNo + '"的隐患？')) {
      this._loadingService.register();
      this._hiddenDangerService.delete(hiddenDanger.id).subscribe(
        res => {
          this._loadingService.resolve();
          this.initData();
          this._toastr.info('移除数据成功');
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
    if (this._regularService.isBlank(this.hiddenDanger.enterpirse)) {
      this._toastr.error('业户名称不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenDanger.examiner)) {
      this._toastr.error('检查人不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.inspection)) {
      this._toastr.error('检查日期不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.dealine)) {
      this._toastr.error('整改期限不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenDanger.insPosition)) {
      this._toastr.error('检查地点不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenDanger.insDesc)) {
      this._toastr.error('检查内容不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenDanger.insQuestion)) {
      this._toastr.error('存在问题不能为空');
      return false;
    }
    if (this._regularService.isBlank(this.hiddenDanger.proPosal)) {
      this._toastr.error('整改意见不能为空');
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
    this.hiddenDanger = {};
  }

  cancel() {
    this.company = '';
    this.startDate = null;
    this.endDate = null;
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
