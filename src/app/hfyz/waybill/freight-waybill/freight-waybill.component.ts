import {Component, OnInit} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {TdLoadingService} from '@covalent/core';
import {DatePipe} from '@angular/common';
import {RegularService} from '../../common/shared/regular.service';
import {FreightWaybillService} from './freight-waybill.service';

@Component({
    selector: 'app-freight-waybill',
    templateUrl: './freight-waybill.component.html',
    styleUrls: ['./freight-waybill.component.css']
})
export class FreightWaybillComponent implements OnInit {
    max: number;   // 表格行数
    page: number;   // 当前页数
    total: number;  // 总数

    vehicleNo: string; // 搜索条件-车辆号牌
    ownerName: string; // 搜索条件-业户名称
    dateBegin: Date; // 搜索条件-起始时间
    dateEnd: Date; // 搜索条件-截至时间

    waybillList: any[]; // 表格数据
    constructor(private _loadingService: TdLoadingService,
                private datePipe: DatePipe,
                private _freightWaybillService: FreightWaybillService,
                private toastr: ToastsManager) {
        this.max = 10;
        this.page = 0;
        this.total = 0;

        this.vehicleNo = '';
        this.ownerName = '';
        this.dateBegin = null;
        this.dateEnd = null;

        this.loadData();
    }

    ngOnInit() {
    }

    /**
     * 加载表格数据
     * @param {number} offset
     */
    loadData(offset = 0) {
        const begin = this.dateBegin ? this.datePipe.transform(this.dateBegin, 'yyyy-MM-dd HH:mm:ss') : '';
        const end = this.dateEnd ? this.datePipe.transform(this.dateEnd, 'yyyy-MM-dd HH:mm:ss') : '';
        this._loadingService.register();
        this._freightWaybillService.search(this.vehicleNo, this.ownerName, begin, end, this.max, offset).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.waybillList = res.resultList;
                    this.total = res.total
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
        if (this.page !== event.page) {
            this.page = event.page;
            this.loadData(this.max * event.page);
        }
    }

    /**
     * 搜索
     */
    search() {
        if (this.validate()) {
            this.loadData()
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
}
