import { Component, OnInit, Renderer } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { OwnerIdentityService } from './shared/owner-identity.service'
import { DatePipe } from '@angular/common';
import { TdLoadingService } from '@covalent/core';
import { zh } from "../common/shared/zh"

@Component({
    selector: 'app-owner-identity',
    templateUrl: './owner-identity.component.html',
    styleUrls: ['./owner-identity.component.css']
})
export class OwnerIdentityComponent implements OnInit {
    ownerList: any[];
    owner: any;
    ownerName: any
    companyCode: any
    displayDialog: boolean;
    formTitle: string;

    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    dateBegin: Date;
    dateEnd: Date;
    pageFlag: string; // 页面切换  LIST 列表页 CREATE 新增页 EDIT 修改页 SHOW 详情
    zh = zh;
    constructor(private renderer: Renderer
        , private toastr: ToastsManager
        , private datePipe: DatePipe
        , private ownerIdentityService: OwnerIdentityService
        , private _loadingService: TdLoadingService) {
        this.displayDialog = false;
        this.owner = {};
        this.clearForm();

        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;

        this.pageFlag = 'LIST';
    }


    ngOnInit() {
        this.initData();
    }

    initData() {
        if (this.validate()) {
            const begin = this.dateBegin ? this.datePipe.transform(this.dateBegin, 'yyyy-MM-dd HH:mm:ss') : '';
            const end = this.dateEnd ? this.datePipe.transform(this.dateEnd, 'yyyy-MM-dd HH:mm:ss') : '';
            this._loadingService.register();
            this.ownerIdentityService.list(begin, end, this.pageMax, this.pageFirst, this.ownerName, this.companyCode).subscribe(
                res => {
                    this._loadingService.resolve();
                    this.ownerList = res.ownerList.ownerList;
                    this.pageTotal = res.ownerList.total;
                    this.pageOffset = this.pageFirst;
                }
            );
        }
    }

    onReset() {
        this.dateBegin = null;
        this.dateEnd = null;
        this.ownerName = '';
        this.companyCode = '';
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.initData();
    }

    onView(id) {
        this.formTitle = `企业详情`;
        this._loadingService.register()
        this.ownerIdentityService.view(id).subscribe(
            res => {
                this._loadingService.resolve()
                if (res.result === 'success') {
                    this.owner = res.owner;
                    this.pageFlag = 'SHOW';
                } else {
                    this.toastr.error('获取数据失败！');
                }
            }
        );
    }

    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.initData();
        }
    }

    cancle() {
        this.pageFlag = 'LIST';
    }

    clearForm() {

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
