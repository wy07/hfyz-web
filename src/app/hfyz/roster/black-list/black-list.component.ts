import { CustomDialogService } from './../../common/shared/custom-dialog.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BlackListService } from './black-list.service';
import { ToastsManager } from 'ng2-toastr';
import { TdLoadingService } from '@covalent/core';
import { DatePipe } from '@angular/common';
import { RegularService } from '../../common/shared/regular.service';
import { zh } from '../../common/shared/zh'
import { TdDialogService } from '@covalent/core';

@Component({
    selector: 'app-black-list',
    templateUrl: './black-list.component.html',
    styleUrls: ['./black-list.component.css']
})
export class BlackListComponent implements OnInit {
    max: number;   // 表格行数
    page: number;   // 当前页数
    total: number;  // 总数

    vehicleNo: string; // 车辆号牌
    dateBegin: Date; // 开始时间
    dateEnd: Date; // 结束时间

    pageFlag: string; // 页面切换  LIST 列表页 ADD 新增页 UPDATE 修改页 DETAIL 详情

    blackLists: any[]; // 表格数据
    blackList: any; // 新增和保存时的黑名单信息
    detail: any; // 详情

    status: any[]; // 布控状态下拉选

    zh = zh;
    constructor(private _blackListService: BlackListService,
        private _loadingService: TdLoadingService,
        private _regularService: RegularService,
        private _customDialogService: CustomDialogService,
        private datePipe: DatePipe,
        private toastr: ToastsManager) {
        this.pageFlag = 'LIST';
        this.max = 10;
        this.page = 0;
        this.total = 0;

        this.vehicleNo = '';
        this.dateBegin = null;
        this.dateEnd = null;

        this.blackLists = [];
        this.blackList = {};
        this.detail = {};

        this.status = [{ label: '未布控', value: 0 }, { label: '布控中', value: 1 }, { label: '解除布控', value: 2 }]
    }

    ngOnInit() {
        this.loadData();
    }

    /**
     * 加载表格数据
     * @param {number} offset
     */
    loadData(offset = 0) {
        const begin = this.dateBegin ? this.datePipe.transform(this.dateBegin, 'yyyy-MM-dd HH:mm:ss') : ''
        const end = this.dateEnd ? this.datePipe.transform(this.dateEnd, 'yyyy-MM-dd HH:mm:ss') : ''
        this._loadingService.register()
        this._blackListService.search(this.vehicleNo, begin, end, this.max, offset).subscribe(
            res => {
                this._loadingService.resolve()
                if (res.result === 'success') {
                    this.blackLists = res.resultList
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
        this.loadData()
    }

    /**
     * 重置搜索条件
     */
    reset() {
        this.vehicleNo = '';
        this.dateBegin = null;
        this.dateEnd = null;
    }

    /**
     * 查看详情
     * @param id
     */
    showDetail(id) {
        this.pageFlag = 'DETAIL';
        this._blackListService.more(id).subscribe(
            res => {
                if (res.result === 'success') {
                    this.detail = res.instance
                } else {
                    this.toastr.error(res.errors)
                }
            }
        )
    }

    /**
     * 删除信息
     * @param id 当前记录对应的数据库记录id
     * @param vehicleNo 车牌号
     */
    delete(id, vehicleNo) {
        const msg = '确认删除车牌号【' + vehicleNo + '】的黑名单信息吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._blackListService.delete(id).subscribe(
                    res => {
                        if (res.result === 'success') {
                            this.toastr.success('删除成功！')
                            this.search()
                        } else {
                            this.toastr.success('删除失败！')
                        }
                    }
                )
            }
        })
    }

    /**
     * 修改
     * @param id
     */
    update(id) {
        this._blackListService.get(id).subscribe(
            res => {
                if (res.result === 'success') {
                    this.blackList = res.instance
                    this.blackList.controlBegin = new Date(res.instance.controlBegin)
                    this.blackList.controlEnd = new Date(res.instance.controlEnd)
                    this.pageFlag = 'UPDATE'
                } else {
                    this.toastr.error(res.errors)
                }
            }
        )

    }

    /**
     * 提交修改
     */
    submitUpdate(id) {
        if (this.validate()) {
            this._loadingService.register()
            this._blackListService.update(id, this.blackList).subscribe(
                res => {
                    this._loadingService.resolve()
                    if (res.result === 'success') {
                        this.toastr.success('修改成功！')
                        this.switchPage()
                        this.search()
                    } else {
                        this.toastr.error(res.errors)
                    }
                }
            )
        }
    }

    /**
     * 新增
     */
    add() {
        this.pageFlag = 'ADD'
        this.blackList.vehicleNo = ''
        this.blackList.controlBegin = ''
        this.blackList.controlEnd = ''
        this.blackList.status = 0
    }

    /**
     * 提交新增内容
     */
    submitAdd() {
        if (this.validate()) {
            this._blackListService.save(this.blackList).subscribe(
                res => {
                    if (res.result === 'success') {
                        this.toastr.success('保存成功！')
                        this.switchPage()
                        this.search()
                    } else {
                        this.toastr.error(res.errors)
                    }
                }
            )
        }
    }


    /**
     * 页面切换
     */
    switchPage() {
        this.pageFlag = 'LIST'
        this.blackList = {}
    }

    /**
     * 验证数据合法性
     */
    validate() {
        let flag = true
        if (this._regularService.isBlank(this.blackList.vehicleNo)) {
            flag = false
            this.toastr.error('车牌号不能为空！')
        }
        if (this._regularService.isBlank(this.blackList.controlBegin)) {
            flag = false
            this.toastr.error('开始时间不能空！')
        }
        if (this._regularService.isBlank(this.blackList.controlEnd)) {
            flag = false
            this.toastr.error('结束时间不能空！')
        }
        if (this._regularService.isBlank(this.blackList.controlBehavior)) {
            flag = false
            this.toastr.error('布控行为不能为空')
        }
        if (this._regularService.isBlank(this.blackList.blackType)) {
            flag = false
            this.toastr.error('黑名单不能为空')
        }
        if (this._regularService.isBlank(this.blackList.controlOrg)) {
            flag = false
            this.toastr.error('布控单位不能为空')
        }
        if (this._regularService.isBlank(this.blackList.controlRange)) {
            flag = false
            this.toastr.error('布控范围不能为空')
        }
        if (this._regularService.isBlank(this.blackList.executor)) {
            flag = false
            this.toastr.error('布控人不能为空')
        }
        if (this._regularService.isBlank(this.blackList.scheme)) {
            flag = false
            this.toastr.error('布控方案不能为空')
        }
        if (this._regularService.isBlank(this.blackList.status)) {
            flag = false
            this.toastr.error('布控状态不能为空')
        }
        if (this.blackList.controlBegin && this.blackList.controlEnd) {
            if (this.blackList.controlBegin >= this.blackList.controlEnd) {
                flag = false
                this.toastr.error('开始时间必须小于结束时间')
            }
        }
        return flag
    }
}
