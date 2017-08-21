import { PassLineBusinessBasicService } from './sheard/pass-line-business-basic.service';
import { PassLineBusinessBasicInfo } from './sheard/pass-line-business-basic-info.model';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { TdLoadingService } from '@covalent/core';
import { DatePipe } from '@angular/common';
import { RegularService } from '../../common/shared/regular.service';

@Component({
    selector: 'pass-line-business-basic',
    templateUrl: './pass-line-business-basic.component.html',
    styleUrls: ['./pass-line-business-basic.component.css']
})
export class PassLineBusinessBasicComponent implements OnInit {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;
    detailFlag: boolean; // 详情对话框flag
    pageFlag: string; // 页面切换  LIST 列表页 CREATE 新增页 EDIT 修改页 SHOW 详情页
    passLineBusinessBasicInfo: PassLineBusinessBasicInfo;
    passLineBusinessInfos: Array<PassLineBusinessBasicInfo>;
    ownerName: string;

    constructor(private _loadingService: TdLoadingService,
        private _regularService: RegularService,
        private datePipe: DatePipe,
        private _passLineBusinessBasicService: PassLineBusinessBasicService,
        private toastr: ToastsManager) {
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
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
     */
    loadData() {
        this._loadingService.register();
        this._passLineBusinessBasicService.search(this.ownerName, this.pageMax, this.pageFirst).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.passLineBusinessInfos = res.resultList;
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
            this.initData();
        }
    }

    // /**
    //  * 搜索
    //  */
    search() {
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.loadData();
    }

    /**
     * 重置
     */
    reset() {
        this.ownerName = '';
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.loadData();
    }

    show(id) {
        this._loadingService.register();
        this._passLineBusinessBasicService.show(id).subscribe(res => {
            this._loadingService.resolve();
            this.passLineBusinessBasicInfo = res.passLineBusinessBasicInfo;
            this.pageFlag = 'SHOW';
        })
    }

    goBack() {
        this.pageFlag = 'LIST';
    }
}
