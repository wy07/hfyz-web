import {PassLineBusinessBasicService} from './sheard/pass-line-business-basic.service';
import {PassLineBusinessBasicInfo} from './sheard/pass-line-business-basic-info.model';
import {Component, OnInit} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {TdLoadingService} from '@covalent/core';
import {DatePipe} from '@angular/common';
import {RegularService} from '../../common/shared/regular.service';

@Component({
    selector: 'pass-line-business-basic',
    templateUrl: './pass-line-business-basic.component.html',
    styleUrls: ['./pass-line-business-basic.component.css']
})
export class PassLineBusinessBasicComponent implements OnInit {
    max: number;   // 表格行数
    page: number;   // 当前页数
    total: number;  // 总数
    detailFlag: boolean; // 详情对话框flag
    pageFlag: string; // 页面切换  LIST 列表页 ADD 新增页 EDIT 修改页
    passLineBusinessBasicInfo: PassLineBusinessBasicInfo
    passLineBusinessInfos: Array<PassLineBusinessBasicInfo>;
    ownerName: string;

    constructor(private _loadingService: TdLoadingService,
                private _regularService: RegularService,
                private datePipe: DatePipe,
                private _passLineBusinessBasicService: PassLineBusinessBasicService,
                private toastr: ToastsManager) {
        this.max = 10;
        this.page = 0;
        this.total = 0;
        this.ownerName = '';
        this.pageFlag = 'LIST';
        this.detailFlag = false;
        this.passLineBusinessInfos = [];
        this.initData();
    }

    initData() {
        this.passLineBusinessBasicInfo = {
            id: '',
            lineCode: '',
            ownerName: '',
            companyCode: '',
            licenseCharacter: '',
            licenseNo: '',
            busType: '',
            startStationName: '',
            endStationName: '',
            stopStation: '',
            mainPoint: '',
            dayTimes: '',
            businessWay: '',
            licenseDecideBookNo: '',
            decideTime: '',
            beginTime: '',
            endTime: '',
            licenseType: '',
            businessSituation: '',
            changeLicenseTimes: '',
            generalinfoChangeTimes: '',
            businessinfoChangeTimes: '',
            inputTotalCar: '',
            inputTotalSeat: '',
            totalLinePlate: '',
            decideOrc: ''
        }
    }

    ngOnInit() {
        this.loadData();
    }

    /**
     * 加载表格数据
     * @param {number} offset
     */
    loadData(offset = 0) {
        this._loadingService.register();
        this._passLineBusinessBasicService.search(this.ownerName, this.max, offset).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.passLineBusinessInfos = res.resultList;
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

    // /**
    //  * 搜索
    //  */
    search() {
        this.loadData();
    }

    /**
     * 重置
     */
    reset() {
        this.ownerName = '';
    }
}
