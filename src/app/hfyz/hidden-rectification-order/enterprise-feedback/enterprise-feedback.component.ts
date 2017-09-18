import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import DateTimeFormat = Intl.DateTimeFormat;
import { DatePipe } from '@angular/common';
import { TdLoadingService } from '@covalent/core';
import { RegularService } from '../../common/shared/regular.service';
import { HiddenRectificationOrderService } from '../shared/hidden-rectification-order.service';
import { zh } from '../../common/shared/zh';
import {AppEventEmittersService} from '../../common/shared/app-event-emitters.service';
import {CustomDialogService} from '../../common/shared/custom-dialog.service';
@Component({
  selector: 'app-enterprise-feedback',
  templateUrl: './enterprise-feedback.component.html',
  styleUrls: ['./enterprise-feedback.component.css']
})
export class EnterpriseFeedbackComponent implements OnInit, OnDestroy {
  pageMax: number;
  pageTotal: number;
  pageFirst: number;
  pageOffset: number;

  hiddenRectificationOrderList: any;
  hiddenRectificationOrder: any;
  edit: boolean;
  hiddenRectificationOrderTitle: string;
  isAdd: boolean;
  inspection: Date;
  dealine: Date;
  reply: Date;
  company: string;
  startDate: any;
  endDate: any;
  maxDate: any;
  isDetails: boolean;
  disabled: boolean;
  enterpirse: any;
  placeholder: any;
  status: any;
  statusList: any[];
  listStatus: any;
  zh = zh;
  subscription: any;
  constructor(
    private _toastr: ToastsManager
    , private _hiddenRectificationOrderService: HiddenRectificationOrderService
    , private _regularService: RegularService
    , private _datePipe: DatePipe
    , private _loadingService: TdLoadingService
    , private _appEmitterService: AppEventEmittersService
    , private _customDialogService: CustomDialogService
  ) {
    this.edit = false;
    this.hiddenRectificationOrder = {};
    this.clear();
    this.pageMax = 10;
    this.pageTotal = 0;
    this.pageFirst = 0;
    this.pageOffset = 0;
    this.company = '';
    this.startDate = '';
    this.endDate = '';
    this.isDetails = false;
    this.maxDate = new Date();
    this.disabled = false;
    this.status = '';
    this.reply = new Date();
    this.statusList = [{ label: '全部', value: '' }, { label: '待反馈', value: '2' },
    { label: '待确认', value: '4' }, { label: '合格', value: '5' }, { label: '不合格', value: '6' }];

      this.subscription = _appEmitterService.tabChange.subscribe((inputs: any) => {
          if (inputs.code === 'enterpriseFeedback') {
              if (inputs.action === 'DFK') {
                 this.onEdit(inputs.sourceId, inputs.action);
              }else if (inputs.action === 'HG' || inputs.action === 'BHG') {
                  this.preEdit(inputs.sourceId)
              }
          }
      });
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
    this._hiddenRectificationOrderService.list(this.pageMax, this.pageFirst, this.company, sd, ed, 'FK', this.listStatus).subscribe(
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

  onEdit(id, action = '') {
    this.reply = new Date();
    this.clear();
    this.hiddenRectificationOrderTitle = '反馈';
    this.isAdd = false;
    this.edit = true;
    this.preEdit(id, action);
  }

  preEdit(id, action = '') {
    if (this.edit === false) {
      this.isDetails = true;
      this.hiddenRectificationOrderTitle = '详情';
    }
    this._loadingService.register();
    this._hiddenRectificationOrderService.edit(id, action).subscribe(
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
          this._toastr.error('获取数据失败！');
        }
      },
      err => {
        this.isDetails = false;
        this.edit = false;
        this._loadingService.resolve();
        this.initData();
      }
    );
  }

  feedback() {
      if (!this.validation()) {
         return;
      }
      const reply = this._datePipe.transform(this.reply, 'yyyy-MM-dd HH:mm');
      const msg = '确认反馈该隐患整改单？';
      const title = '提示';
      this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
          if (accept) {
              this._loadingService.register();
              this._hiddenRectificationOrderService.feedback(this.hiddenRectificationOrder.id, reply,
                    this.hiddenRectificationOrder.replyDesc).subscribe(res => {
                  this._loadingService.resolve();
                  this._toastr.success('反馈成功！');
                  this.edit = false;
                  this.initData();
              })
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
    if (this._regularService.isBlank(this.hiddenRectificationOrder.replyDesc)) {
      this._toastr.error('反馈内容不能为空!');
      return false;
    }
    return true;
  }

  clear() {
    this.hiddenRectificationOrder = {};
  }

  onSearch() {
    this.pageFirst = 0;
    this.pageOffset = 0;
    this.initData();
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

  ngOnDestroy() {
     this.subscription.unsubscribe();
  }
}
