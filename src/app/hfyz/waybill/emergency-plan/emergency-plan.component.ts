import { Component, OnInit } from '@angular/core';
import { EmergencyPlanService } from './sheard/emergency-plan.service';
import { ToastsManager } from 'ng2-toastr';
import { RegularService } from '../../common/shared/regular.service';
import { TdLoadingService } from '@covalent/core';
import { CustomDialogService } from '../../common/shared/custom-dialog.service';

@Component({
    selector: 'app-emergency-plan',
    templateUrl: './emergency-plan.component.html',
    styleUrls: ['./emergency-plan.component.css']
})
export class EmergencyPlanComponent implements OnInit {
    emergencyPlanList: any;
    dangerousTypes: any;
    emergencyPlan: any;
    title: any;
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;
    pageFlag: string;
    constructor(private _emergencyPlanService: EmergencyPlanService
        , private _toastr: ToastsManager
        , private _regularService: RegularService
        , private _customDialogService: CustomDialogService
        , private _loadingService: TdLoadingService) {

        this.emergencyPlanList = [];
        this.dangerousTypes = [];
        this.emergencyPlan = {};
        this.pageFlag = 'LIST';
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
    }

    ngOnInit() {
        this.initData();
    }

    initData() {
        this._loadingService.register()
        this._emergencyPlanService.list(this.pageMax, this.pageFirst).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.emergencyPlanList = res.emergencyPlanList
                    this.pageTotal = res.total;
                    this.pageOffset = this.pageFirst;
                } else {
                    this._toastr.error(res.errors);
                }
            }
        )
    }
    onCreate() {
        this.pageFlag = 'ADD'
        this.title = '新增'
        this.emergencyPlan = {}

        this._loadingService.register();
        this._emergencyPlanService.dangerousTypeList().subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    for (const item of res.dangerousTypeList) {
                        this.dangerousTypes.push({ label: item.name, value: item.id });
                    }
                } else {
                    this._toastr.error(res.errors);
                }
            }
        )
    }

    onSubmit() {
        if (!this.validation()) {
           return;
        }
        this._loadingService.register();
        this._emergencyPlanService.save(this.emergencyPlan).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.pageFlag = 'LIST';
                    this.initData();
                    this._toastr.success('保存成功！');
                } else {
                    this._toastr.error(res.errors);
                }
            });
    }

    showDetail(id) {
        this.pageFlag = 'DETAIL'
        this.onEdit(id);
    }

    onEdit(id) {
        if (this.pageFlag !== 'DETAIL') {
            this.pageFlag = 'EDIT'
            this.title = '编辑'
        }
        this._loadingService.register();
        this._emergencyPlanService.edit(id).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.emergencyPlan = res.emergencyPlan
                    for (const item of res.dangerousTypeList) {
                        this.dangerousTypes.push({ label: item.name, value: item.id });
                    }
                } else {
                    this._toastr.error(res.errors);
                }
            });
    }

    onUpdate() {
        if (!this.validation()) {
            return;
        }
        this._loadingService.register();
        this._emergencyPlanService.update(this.emergencyPlan).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.pageFlag = 'LIST';
                    this.initData();
                    this._toastr.success('修改成功！');
                } else {
                    this._toastr.error(res.errors);
                }
            });
    }

    onDelete(emergencyPlan) {
        const msg = '确认删除应急预案为【' + emergencyPlan.name + '】的记录吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._emergencyPlanService.delete(emergencyPlan.id).subscribe(
                    res => {
                        this._loadingService.resolve();
                        this._toastr.info('删除成功！');
                        this.pageFirst = 0;
                        this.initData();
                    }
                );
            }
        });
    }

    onBack() {
        this.pageFlag = 'LIST';
    }

    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.initData();
        }
    }

    onCancel() {
        this.emergencyPlan = {};
        this.pageFlag = 'LIST';
    }

    validation() {
        if (this._regularService.isBlank(this.emergencyPlan.name)) {
            this._toastr.error('应急预案名称不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.emergencyPlan.dangerousTypeId)) {
            this._toastr.error('请选择危险品运输类型！');
            return false;
        }
        if (this._regularService.isBlank(this.emergencyPlan.describe)) {
            this._toastr.error('描述不能为空！');
            return false;
        }
        return true;
    }
}
