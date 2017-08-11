import {Component, OnInit, Renderer} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {OwnerIdentityService} from './shared/owner-identity.service'
import {DatePipe} from '@angular/common';
import {TdLoadingService} from "@covalent/core";

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
    max: number;
    total: number;
    currentPage: number;
    dateBegin: Date;
    dateEnd: Date;

    constructor(private renderer: Renderer
        , private toastr: ToastsManager
        , private datePipe: DatePipe
        , private ownerIdentityService: OwnerIdentityService
        , private _loadingService: TdLoadingService) {
        this.displayDialog = false;
        this.owner = {};
        this.clearForm();
        this.max = 10;
    }


    ngOnInit() {
        this.initData();
    }

    initData(offset = 0) {
        if (this.validate()) {
            const begin = this.dateBegin ? this.datePipe.transform(this.dateBegin, 'yyyy-MM-dd HH:mm:ss') : '';
            const end = this.dateEnd ? this.datePipe.transform(this.dateEnd, 'yyyy-MM-dd HH:mm:ss') : '';
            this._loadingService.register();
            this.ownerIdentityService.list(begin, end, this.max, offset, this.ownerName, this.companyCode).subscribe(
                res => {
                    this._loadingService.resolve();
                    this.ownerList = res.ownerList.ownerList;
                    this.total = res.ownerList.total;
                }
            );
        }
    }

    onReset() {
        this.dateBegin = null;
        this.dateEnd = null;
        this.ownerName = '';
        this.companyCode = '';
    }

    onView(id) {
        this.displayDialog = true;
        this.formTitle = `企业详情`;
        this.ownerIdentityService.view(id).subscribe(
            res => {
                if (res.result === 'success') {
                    this.owner = res.owner;
                } else {
                    this.toastr.error('获取数据失败');
                }
            }
        );
    }

    paginate(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.initData(this.max * event.page);
        }
    }

    cancle() {
        this.displayDialog = false;
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
