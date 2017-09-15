import { FreightWaybillApprove } from './sheard/freight-waybill-approve.model';
import { FreightWaybillApproveService } from './sheard/freight-waybill-approve.service';
import { FreightWaybill } from './../freight-waybill/sheard/freight-waybill.model';
import { FreightWaybillService } from './../freight-waybill/sheard/freight-waybill.service';
import { ToastsManager } from 'ng2-toastr';
import { DatePipe } from '@angular/common';
import { RegularService } from './../../common/shared/regular.service';
import { CustomDialogService } from './../../common/shared/custom-dialog.service';
import { TdLoadingService } from '@covalent/core';
import { zh } from './../../common/shared/zh';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppEventEmittersService} from '../../common/shared/app-event-emitters.service';

@Component({
    selector: 'app-freight-waybill-approve',
    templateUrl: './freight-waybill-approve.component.html',
    styleUrls: ['./freight-waybill-approve.component.css']
})
export class FreightWaybillApproveComponent implements OnInit, OnDestroy {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    detailFlag: Boolean;
    vehicleNo: string; // 搜索条件-车辆号牌
    ownerName: string; // 搜索条件-业户名称
    dateBegin: Date; // 搜索条件-起始时间
    dateEnd: Date; // 搜索条件-截至时间
    status: string; // 搜索条件-状态
    pageFlag: string; // 页面切换  LIST 列表页 CREATE 新增页 EDIT 修改页 SHOW 详情

    zh = zh;
    waybillList: Array<FreightWaybill>; // 表格数据
    freightWaybill: FreightWaybill;
    freightWaybillApprove: FreightWaybillApprove;
    subscription: any;

    constructor(private _loadingService: TdLoadingService,
        private _freightWaybillService: FreightWaybillService,
        private _freightWaybillApproveService: FreightWaybillApproveService,
        private _customDialogService: CustomDialogService,
        private _regularService: RegularService,
        private _datePipe: DatePipe,
        private toastr: ToastsManager,
        private _appEmitterService: AppEventEmittersService) {
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;

        this.vehicleNo = '';
        this.ownerName = '';
        this.dateBegin = null;
        this.dateEnd = null;
        this.detailFlag = false;
        this.status = 'SHZ'
        this.pageFlag = 'LIST';

        this.subscription = _appEmitterService.tabChange.subscribe((inputs: any) => {
            if (inputs.code === 'freightWaybillApprove' && inputs.action === 'SHZ') {
                this.show(inputs.sourceId, inputs.action);
            }
        });
    }

    ngOnInit() {
        this.initData();
        this.loadData();
    }

    initData() {
        this.freightWaybill = {
            id: '', vehicleNo: '', frameNo: '', licenseNo: '', companyCode: sessionStorage.getItem('companyCode'), ownerName: '',
            dangerousType: { id: '', name: '' }, ratifiedPayload: '', emergencyPlan: { id: '', name: '', describe: '' }, price: '',
            mile: '', departTime: '', consignCompany: '', backTime: '', departArea: '', arriveArea: '', fullLoaded: '否', amount: '',
            status: '', startProvince: '', startCity: '', startCityCode: '', startDistrict: '', startDistrictCode: '', routerName: '',
            endProvince: '', endProvinceCode: '', endCity: '', endCityCode: '', endDistrict: '', endDistrictCode: '', viaLand: '',
            provenance: '', destination: '', startProvinceCode: '', carPlateColor: '', carType: '', carSize: '', dangerousName: '',
            driver: { name: '', wokeLicenseNo: '', phone: '' }, supercargo: { name: '', wokeLicenseNo: '', phone: '' }, operatedType: '',
            loadedType: '装载'
        }

        this.freightWaybillApprove = { id: '', approveDesc: '', approveTime: '', approver: { id: '', name: '' } };
    }

    loadData(): Promise<any> {
        return new Promise((resolve, reject) => {
            const begin = this.dateBegin ? this._datePipe.transform(this.dateBegin, 'yyyy-MM-dd HH:mm:ss') : '';
            const end = this.dateEnd ? this._datePipe.transform(this.dateEnd, 'yyyy-MM-dd HH:mm:ss') : '';
            this._loadingService.register();
            this._freightWaybillService.search(this.vehicleNo, this.ownerName, begin, end, this.pageMax, this.pageFirst, this.status)
                .subscribe(
                res => {
                    this._loadingService.resolve();
                    if (res.result === 'success') {
                        this.waybillList = res.resultList;
                        this.pageTotal = res.total;
                        this.pageOffset = this.pageFirst;
                        resolve('success');
                    } else {
                        this.toastr.error(res.errors)
                        reject('error');
                    }
                }
                )
        })
    }

    /**
     * 分页插件p-paginator方法
     * @param event
     */
    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.loadData();
        }
    }

    /**
     * 搜索
     */
    search() {
        if (this.validate()) {
            this.pageFirst = 0;
            this.pageOffset = 0;
            this.loadData();
        }
    }

    /**
     * 重置
     */
    reset() {
        this.vehicleNo = '';
        this.ownerName = '';
        this.dateBegin = null;
        this.dateEnd = null;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.loadData();
    }

    /**
     * 搜索参数验证
     */
    validate() {
        let flag = true
        if (this.dateBegin && this.dateEnd) {
            if (this.dateBegin > this.dateEnd) {
                flag = false;
                this.toastr.error('开始时间不能大于结束时间！');
            }
        }
        if ((this.dateBegin || this.dateEnd) && !(this.dateBegin && this.dateEnd)) {
            flag = false
            this.toastr.error('起止时间必须全部填写！')
        }
        return flag
    }

    show(id, action = '') {
        this._loadingService.register();
        this._freightWaybillService.show(id, action).subscribe(res => {
            this._loadingService.resolve();
            this.freightWaybill = res.freightWaybill
            this.pageFlag = 'SHOW';
        },
        err => {
            this._loadingService.resolve();
        })
    }

    approveOpinion(type) {
        if (!this.validation()) {
            return;
        }
        const msg = '确认审批该电子路单？';
        const title = '提示';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._freightWaybillApproveService.approveOpinion(this.freightWaybill.id, type).subscribe(
                    res => {
                        this._loadingService.resolve();
                        this.toastr.success('审批成功');
                        this.goBack();
                    }
                )
            }
        })
    }

    goBack() {
        this.initData();
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.pageFlag = 'LIST';
        this.loadData();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    validation() {
        if (this._regularService.isBlank(this.freightWaybillApprove.approveDesc)) {
            this.toastr.error('审批意见不能为空！');
            return false;
        }
        return true;
    }
}
