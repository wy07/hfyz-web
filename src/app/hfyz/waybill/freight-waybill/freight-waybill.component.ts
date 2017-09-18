import { CustomDialogService } from './../../common/shared/custom-dialog.service';
import { FreightWaybillService } from './sheard/freight-waybill.service';
import { FreightWaybill } from './sheard/freight-waybill.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { TdLoadingService } from '@covalent/core';
import { DatePipe } from '@angular/common';
import { RegularService } from '../../common/shared/regular.service';
import { zh } from '../../common/shared/zh';
import {AppEventEmittersService} from "../../common/shared/app-event-emitters.service";

@Component({
    selector: 'app-freight-waybill',
    templateUrl: './freight-waybill.component.html',
    styleUrls: ['./freight-waybill.component.css']
})
export class FreightWaybillComponent implements OnInit, OnDestroy {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    detailFlag: Boolean;
    vehicleNo: string; // 搜索条件-车辆号牌
    ownerName: string; // 搜索条件-业户名称
    dateBegin: Date; // 搜索条件-起始时间
    dateEnd: Date; // 搜索条件-截至时间
    pageFlag: string; // 页面切换  LIST 列表页 CREATE 新增页 EDIT 修改页 SHOW 详情

    waybillList: Array<FreightWaybill>; // 表格数据
    freightWaybill: FreightWaybill;
    zh = zh;
    carList: any;
    dangerousTypeList: any;
    driversList = [];
    managersList = [];
    viaLandList = [];
    emergencyPlanList = [];
    btnType: boolean;
    subscription: any;

    constructor(private _loadingService: TdLoadingService,
        private _freightWaybillService: FreightWaybillService,
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
        this.pageFlag = 'LIST';
        this.carList = [];
        this.driversList = [];
        this.managersList = [];
        this.dangerousTypeList = [];
        this.viaLandList = [];
        this.emergencyPlanList = [];
        this.btnType = true;
        this.initData();

        this.subscription = _appEmitterService.tabChange.subscribe((inputs: any) => {
            if (inputs.code === 'freightWaybill') {
                this.show(inputs.sourceId);
            }
        });
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
    }

    ngOnInit() {
        this.loadData();
        this.getCarVehicleNos();
    }

    /**
     * 加载表格数据
     * @param {number} offset
     */
    loadData(): Promise<any> {
        return new Promise((resolve, reject) => {
            const begin = this.dateBegin ? this._datePipe.transform(this.dateBegin, 'yyyy-MM-dd HH:mm:ss') : '';
            const end = this.dateEnd ? this._datePipe.transform(this.dateEnd, 'yyyy-MM-dd HH:mm:ss') : '';
            this._loadingService.register();
            this._freightWaybillService.search(this.vehicleNo, this.ownerName, begin, end, this.pageMax, this.pageFirst).subscribe(
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

    show(id) {
        this._loadingService.register();
        this._freightWaybillService.show(id).subscribe(res => {
            this._loadingService.resolve();
            this.freightWaybill = res.freightWaybill
            this.pageFlag = 'SHOW';
        })
    }

    goBack() {
        this.getCarVehicleNos();
        this.initData();
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.loadData();
        this.pageFlag = 'LIST';
    }

    changeDangerousType(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.freightWaybill.dangerousType.id) {
                this._freightWaybillService.getEmergencyPlanByDangerousType(this.freightWaybill.dangerousType.id).subscribe(res => {
                    this.emergencyPlanList = res.emergencyPlanList
                    resolve()
                })
            } else {
                this.emergencyPlanList = [];
                this.freightWaybill.emergencyPlan = {id: '', name: '', describe: ''}
                resolve()
            }
        })
    }

    getCarVehicleNos() {
        this._loadingService.register();
        this._freightWaybillService.getCompanyDangerousCarsInfo(this.freightWaybill.companyCode).subscribe(res => {
            this._loadingService.resolve();
            this.carList = res.cars
            this.dangerousTypeList = res.dangerousTypeList;
            this.driversList = res.driversList;
            this.managersList = res.managersList;
        })
    }

    changeCar() {
        this._loadingService.register();
        this._freightWaybillService.getCarInfo(this.freightWaybill.vehicleNo).subscribe(res => {
            this._loadingService.resolve();
            this.freightWaybill.ownerName = sessionStorage.getItem('companyName');
            this.freightWaybill.carPlateColor = res.carInfo.carPlateColor;
            this.freightWaybill.carType = res.carInfo.carType;
            this.freightWaybill.carSize = res.carInfo.carSize;
            this.freightWaybill.licenseNo = this.freightWaybill.vehicleNo;
        })
    }

    selectCity(event, type) {
        if (type === 'departArea') {
            this.freightWaybill.departArea = event.name;
            const provenance = event.name.split('/');
            const provenanceCode = event.value.split('/');
            this.freightWaybill.provenance = event.name;
            this.freightWaybill.startProvince = provenance[0];
            this.freightWaybill.startCity = provenance[1];
            this.freightWaybill.startDistrict = provenance[2];
            this.freightWaybill.startProvinceCode = provenanceCode[0];
            this.freightWaybill.startCityCode = provenanceCode[1];
            this.freightWaybill.startDistrictCode = provenanceCode[2];
        } else {
            this.freightWaybill.arriveArea = event.name;
            const destination = event.name.split('/');
            const destinationCode = event.value.split('/');
            this.freightWaybill.destination = event.name;
            this.freightWaybill.endProvince = destination[0];
            this.freightWaybill.endCity = destination[1];
            this.freightWaybill.endDistrict = destination[2];
            this.freightWaybill.endProvinceCode = destinationCode[0];
            this.freightWaybill.endCityCode = destinationCode[1];
            this.freightWaybill.endDistrictCode = destinationCode[2];
        }
        this.getViaLand();
    }

    getViaLand(routerName?) {
        let area = this._freightWaybillService.getArea();
        if (this.freightWaybill.arriveArea && this.freightWaybill.departArea
            && (area.arriveArea !== this.freightWaybill.arriveArea
                || area.departArea !== this.freightWaybill.departArea)) {
            this.freightWaybill.routerName = routerName ? routerName : '';
            area = { arriveArea: this.freightWaybill.arriveArea, departArea: this.freightWaybill.departArea }
            this._freightWaybillService.setArea(area);
            this._freightWaybillService.getViaLand(this.freightWaybill.companyCode, this.freightWaybill.startDistrictCode,
                this.freightWaybill.endDistrictCode).subscribe(res => {
                    this.viaLandList = res.viaLands;
                })
        }
    }

    add() {
        this.initData();
        this.pageFlag = 'CREATE';
        this.getCarVehicleNos();
    }

    save() {
        if (this.validationData()) {
            this.freightWaybill.routerName = this.viaLandList.find(obj => obj.viaLand === this.freightWaybill.viaLand).routerName
            this._loadingService.register();
            this._freightWaybillService.save(this.freightWaybill).subscribe(res => {
                this._loadingService.resolve();
                this.toastr.success('新增成功.')
                this.goBack();
            })
        }
    }

    edit(id) {
        this._loadingService.register();
        this._freightWaybillService.edit(id).subscribe(res => {
            this.freightWaybill = res.freightWaybill;
            this.getViaLand(res.freightWaybill.routerName);
            this.freightWaybill.routerName = res.freightWaybill.routerName
            this.freightWaybill.driver = this.driversList.find(obj => obj.name === this.freightWaybill.driver.name)
            this.freightWaybill.supercargo = this.managersList.find(obj => obj.name === this.freightWaybill.supercargo.name)
            this.freightWaybill.dangerousType = this.dangerousTypeList.find(obj => obj.id === this.freightWaybill.dangerousType.id)
            this.btnType = false;
            this.changeDangerousType().then(cg => {
                this._loadingService.resolve();
                this.freightWaybill.emergencyPlan = this.emergencyPlanList.find(obj => obj.id === this.freightWaybill.emergencyPlan.id);
            })
            this.pageFlag = 'CREATE'
        })
    }

    update() {
        if (this.validationData()) {
            this._loadingService.register();
            this.freightWaybill.departTime = this._datePipe.transform(this.freightWaybill.departTime, 'yyyy-MM-dd HH:mm');
            this.freightWaybill.backTime = this._datePipe.transform(this.freightWaybill.backTime, 'yyyy-MM-dd HH:mm');
            this._freightWaybillService.update(this.freightWaybill).subscribe(res => {
                this._loadingService.resolve();
                this.toastr.success('修改成功.')
                this.goBack();
            })
        }
    }

    delete(id, vehicleNo) {
        const msg = '确认删除车牌号为【' + vehicleNo + '】的记录吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._freightWaybillService.delete(id).subscribe(res => {
                    this._loadingService.resolve();
                    this.toastr.info('删除成功.')
                    this.goBack();
                })
            }
        })
    }

    validationData() {
        if (this._regularService.isBlank(this.freightWaybill.vehicleNo)) {
            this.toastr.error('车牌号不能为空！');
            return false
        }
        if (this._regularService.isBlank(this.freightWaybill.driver.name)) {
            this.toastr.error('驾驶员信息不能为空！');
            return false
        }
        if (this._regularService.isBlank(this.freightWaybill.supercargo.name)) {
            this.toastr.error('押运员信息不能为空！');
            return false
        }
        if (this._regularService.isBlank(this.freightWaybill.departArea)) {
            this.toastr.error('出发的不能为空！');
            return false
        }
        if (this._regularService.isBlank(this.freightWaybill.arriveArea)) {
            this.toastr.error('目的地不能为空！');
            return false
        }
        if (this._regularService.isBlank(this.freightWaybill.viaLand)) {
            this.toastr.error('途径地不能为空！');
            return false
        }
        return true
    }

    submit(id) {
        const msg = '确认提交该电子路单？';
        const title = '提示';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._freightWaybillService.submit(id).subscribe(
                    res => {
                        this._loadingService.resolve();
                        this.toastr.success('提交成功！');
                        this.goBack();
                    }
                )
            }
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
