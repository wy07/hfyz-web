import { Component, OnInit } from '@angular/core';
import {EmergencyPlanService} from './sheard/emergency-plan.service';
import {ToastsManager} from 'ng2-toastr';
import {RegularService} from '../../common/shared/regular.service';
import {TdLoadingService} from '@covalent/core';
import {CustomDialogService} from '../../common/shared/custom-dialog.service';

@Component({
    selector: 'app-emergency-plan',
    templateUrl: './emergency-plan.component.html',
    styleUrls: ['./emergency-plan.component.css']
})
export class EmergencyPlanComponent implements OnInit {
    emergencyPlanList: any;
    dangerousTypes: any;
    emergencyPlan: any;
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
                    this._toastr.error(res.errors)
                }
            }
        )
    }
    onCreate() {
        this.pageFlag = 'ADD'
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
                    this._toastr.error(res.errors)
                }
            }
        )
    }

    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.initData();
        }
    }

}
