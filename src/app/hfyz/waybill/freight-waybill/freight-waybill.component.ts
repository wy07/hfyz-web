import { FreightWaybillService } from './sheard/freight-waybill.service';
import { FreightWaybill } from './sheard/freight-waybill.model';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { TdLoadingService } from '@covalent/core';
import { DatePipe } from '@angular/common';
import { RegularService } from '../../common/shared/regular.service';
import { zh } from '../../common/shared/zh';

@Component({
    selector: 'app-freight-waybill',
    templateUrl: './freight-waybill.component.html',
    styleUrls: ['./freight-waybill.component.css']
})
export class FreightWaybillComponent implements OnInit {
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
    constructor(private _loadingService: TdLoadingService,
        private datePipe: DatePipe,
        private _freightWaybillService: FreightWaybillService,
        private toastr: ToastsManager) {
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
        this.initData();
    }

    initData() {
        this.freightWaybill = {
            id: '', vehicleNo: '', frameNo: '', companyCode: '', ownerName: '', dangerousName: '', dangerousType: '',
            ratifiedPayload: '', emergencyPlan: '', price: '', operatedType: '', loadedType: '', fullLoaded: '', amount: '',
            mile: '', departTime: '', driverName: '', idCardNo: '', consignCompany: '', backTime: '', departArea: '', arriveArea: '',
            status: '', routerName: '', startProvince: '', startCity: '', startCityCode: '', startDistrict: '', startDistrictCode: '',
            endProvince: '', endProvinceCode: '', endCity: '', endCityCode: '', endDistrict: '', endDistrictCode: '', viaLand: '',
            provenance: '', destination: '', startProvinceCode: ''
        }
    }

    ngOnInit() {
        this.loadData();
    }

    /**
     * 加载表格数据
     * @param {number} offset
     */
    loadData() {
        const begin = this.dateBegin ? this.datePipe.transform(this.dateBegin, 'yyyy-MM-dd HH:mm:ss') : '';
        const end = this.dateEnd ? this.datePipe.transform(this.dateEnd, 'yyyy-MM-dd HH:mm:ss') : '';
        this._loadingService.register();
        this._freightWaybillService.search(this.vehicleNo, this.ownerName, begin, end, this.pageMax, this.pageFirst).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.waybillList = res.resultList;
                    this.pageTotal = res.total;
                    this.pageOffset = this.pageFirst;
                } else {
                    this.toastr.error(res.errors)
                }
            }
        )
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
            console.log('=====res====' + JSON.stringify(res))
            this.freightWaybill = res.freightWaybill
            this.pageFlag = 'SHOW';
        })
    }

    goBack() {
        this.pageFlag = 'LIST'
    }
}
