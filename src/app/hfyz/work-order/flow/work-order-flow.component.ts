import { RegularService } from './../../common/shared/regular.service';
import { SystemCodeService } from './../../basic/systemCode/shared/system-code.service';
import { ToastsManager } from 'ng2-toastr';
import { TdLoadingService } from '@covalent/core';
import { WorkOrderFlowService } from './../shared/work-order-flow.service';
import { Component, OnInit } from '@angular/core';
import { WorkOrderFlowObj } from '../shared/work-order-flow-obj';
import {CustomDialogService} from '../../common/shared/custom-dialog.service';

@Component({
  selector: 'app-work-order-flow',
  templateUrl: './work-order-flow.component.html',
  styleUrls: ['./work-order-flow.component.css']
})
export class WorkOrderFlowComponent implements OnInit {

  action: string;
  flowList: any[];

  pageMax: number;
  pageTotal: number;
  pageFirst: number;
  pageOffset: number;

  formTitle: string;
  isAdd: boolean;
  alarmTypes: any[];
  orgs: any[];

  workOrderFlow: any;
  examineFlows: WorkOrderFlowObj[];
  feedbackFlow: WorkOrderFlowObj;
  judgeFlow: WorkOrderFlowObj;

  details: any;


  constructor(private _flowService: WorkOrderFlowService
    , private _loadingService: TdLoadingService
    , private _toastr: ToastsManager
    , private _systemCodeService: SystemCodeService
    , private _regularService: RegularService
    , private _customDialogService: CustomDialogService) {
    this.action = 'list';
    this.flowList = [];
    this.pageMax = 10;
    this.pageTotal = 0;
    this.pageFirst = 0;
    this.pageOffset = 0;
    this.judgeFlow = { name: '', org: null, role: '' };
    this.feedbackFlow = { name: '', org: null, role: '' };
    this.examineFlows = [];
    this.workOrderFlow = { alarmType: null };
    this.details = {};
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this._loadingService.register();
    this._flowService.list(this.pageMax, this.pageFirst).subscribe(
      res => {
        this._loadingService.resolve();
        this.flowList = res.workOrderFlowList;
        this.pageTotal = res.workOrderFlowCount;
        this.pageOffset = this.pageFirst;
      }
    );
  }

  paginate(event) {
    if (this.pageOffset !== event.first) {
      this.initData();
    }
  }

  onEffect(id) {
      const msg = '确认生效该工作流？';
      const title = '提示';
      this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
          if (accept) {
              this._loadingService.register();
              this._flowService.effect(id).subscribe(res => {
                  this._loadingService.resolve();
                  this._toastr.success('生效成功！');
                  this.action = 'list';
                  this.initData();
              })
          }
      })
  }

  onCreate() {
    this.clear();
    this._flowService.creat().subscribe(
      res => {
        this.alarmTypes = res.alarmTypes;
        this.orgs = res.orgList
        this.formTitle = '新增';
        this.isAdd = true;
        this.action = 'update';
      }
    )
  }

  onEdit(id) {
    this.clear();
    this._flowService.edit(id).subscribe(
      res => {
        this.alarmTypes = res.alarmTypes;
        this.orgs = res.orgList
        this.formTitle = '编辑';

        this.workOrderFlow = res.workOrderFlow;

        for (const flow of this.workOrderFlow.flows) {
          const org = this.orgs.find(x => x.roles.find(y => y.authority === flow.role));
          if (flow.action === 'SP') {
            this.examineFlows.push({ name: flow.name, org: org.id, role: flow.role })
          } else if (flow.action === 'FK') {
            this.feedbackFlow = { name: flow.name, org: org.id, role: flow.role }
          } else if (flow.action === 'YP') {
            this.judgeFlow = { name: flow.name, org: org.id, role: flow.role }
          }
        }
        this.isAdd = false;
        this.action = 'update';
      }
    )
  }

  onShow(id) {
    this._loadingService.register();
    this._flowService.show(id).subscribe(res => {
      this._loadingService.resolve();
      this.details = res.workOrderFlow;
      this.action = 'show';
    })
  }

  clear() {
    this.workOrderFlow = { alarmType: null };
    this.judgeFlow = { name: '', org: null, role: '' };
    this.feedbackFlow = { name: '', org: null, role: '' };
    this.examineFlows = [];
  }

  onSave() {
    if (!this.validate()) {
      return false;
    }
    this._flowService.save({
      alarmType: this.workOrderFlow.alarmType
      , examineFlows: this.examineFlows
      , feedbackFlow: this.feedbackFlow
      , judgeFlow: this.judgeFlow
    }).subscribe(
      res => {
        this._toastr.success('保存成功！');
        this.initData();
        this.action = 'list';
      }
      );
  }

  onUpdate() {
    if (!this.validate()) {
      return false;
    }
    this._flowService.update(this.workOrderFlow.id
      , {
        alarmType: this.workOrderFlow.alarmType
        , examineFlows: this.examineFlows
        , feedbackFlow: this.feedbackFlow
        , judgeFlow: this.judgeFlow
      }).subscribe(
      res => {
        this._toastr.success('修改成功！');
        this.initData();
        this.action = 'list';
      }
      );
  }

  getRoles(orgId: number) {
    const orgObj = this.orgs.find(x => x.id === orgId);
    return orgObj ? orgObj.roles : [];
  }

  addExamineFlow() {
    this.examineFlows.push({ name: '', org: null, role: '' });
  }
  removeExamineFlow(index) {
    this.examineFlows.splice(index, 1);
  }

  validate() {
    if (this._regularService.isBlank(this.workOrderFlow.alarmType)) {
      this._toastr.error('报警类型不能为空！');
      return false;
    }

    if (this.examineFlows.length < 1) {
      this._toastr.error('请设置审批流程！');
      return false;
    }

    for (let i = 0; i < this.examineFlows.length; i++) {
      const flow = this.examineFlows[i];
      if (this._regularService.isBlank(flow.name)) {
        this._toastr.error(`第${i + 1}条审批流程的名称不能为空！`);
        return false;
      }

      if (this._regularService.isBlank(flow.role)) {
        this._toastr.error(`第${i + 1}条审批流程的角色不能为空！`);
        return false;
      }
    }

    if (this._regularService.isBlank(this.feedbackFlow.name)) {
      this._toastr.error(`反馈流程的名称不能为空！`);
      return false;
    }

    if (this._regularService.isBlank(this.feedbackFlow.role)) {
      this._toastr.error(`反馈流程的角色不能为空！`);
      return false;
    }

    if (this._regularService.isBlank(this.judgeFlow.name)) {
      this._toastr.error(`研判流程的名称不能为空！`);
      return false;
    }

    if (this._regularService.isBlank(this.judgeFlow.role)) {
      this._toastr.error(`研判流程的角色不能为空！`);
      return false;
    }

    return true;
  }
}
