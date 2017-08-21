import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { DatePipe } from '@angular/common';
import { WhiteListService } from '../white-list/white-list.service';
import { TdLoadingService } from '@covalent/core';
import { RegularService } from '../../common/shared/regular.service';
import { zh } from "../../common/shared/zh";

@Component({
    selector: 'app-white-list',
    templateUrl: './white-list.component.html',
    styleUrls: ['./white-list.component.css']
})
export class WhiteListComponent implements OnInit {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    vehicleNo: string; // 车辆号牌

    pageFlag: string; // 页面切换  LIST 列表页 ADD 新增页 UPDATE 修改页 DETAIL 详情页

    whiteLists: any[]; // 表格数据
    whiteList: any; // 新增和保存时的黑名单信息
    detail: any; // 详情

    status: any[]; // 布控状态下拉选
    zh = zh;
    constructor(private _whiteListService: WhiteListService,
        private _loadingService: TdLoadingService,
        private _regularService: RegularService,
        private datePipe: DatePipe,
        private toastr: ToastsManager) {
        this.pageFlag = 'LIST';
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;

        this.vehicleNo = '';

        this.whiteLists = [];
        this.whiteList = {};
        this.detail = {};
        this.status = [{ label: '未布控', value: 0 }, { label: '布控中', value: 1 }, { label: '解除布控', value: 2 }]

    }

    ngOnInit() {
        this.loadData();
    }

    /**
     * 加载表格数据
     */
    loadData() {
        this._loadingService.register()
        this._whiteListService.search(this.vehicleNo, this.pageMax, this.pageFirst).subscribe(
            res => {
                this._loadingService.resolve()
                if (res.result === 'success') {
                    this.whiteLists = res.resultList;
                    this.pageTotal = res.total;
                    this.pageOffset = this.pageFirst;
                } else {
                    this.toastr.error(res.errors)
                }
            }
        )
    }

    /**
     * 搜索
     */
    search() {
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.loadData()
    }

    /**
     * 详情
     * @param id
     */
    showDetail(id) {
        this.pageFlag = 'DETAIL';
        this._whiteListService.more(id).subscribe(
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
        if (confirm('确认删除车牌号【' + vehicleNo + '】的黑名单信息吗？')) {
            this._whiteListService.delete(id).subscribe(
                res => {
                    if (res.result === 'success') {
                        this.toastr.success('删除成功！')
                        this.search()
                    } else {
                        this.toastr.error('删除失败！')
                    }
                }
            )
        }
    }

    /**
     * 修改
     * @param id
     */
    update(id) {
        this._whiteListService.get(id).subscribe(
            res => {
                if (res.result === 'success') {
                    this.whiteList = res.instance
                    this.whiteList.controlBegin = new Date(res.instance.controlBegin)
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
            this._whiteListService.update(id, this.whiteList).subscribe(
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
        this.whiteList.vehicleNo = ''
        this.whiteList.status = 0
    }

    /**
     * 提交新增内容
     */
    submitAdd() {
        if (this.validate()) {
            this._whiteListService.save(this.whiteList).subscribe(
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
     * 分页插件p-paginator方法
     * @param event
     */
    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.loadData();
        }
    }

    /**
     * 新增页面切换
     */
    switchPage() {
        this.pageFlag = 'LIST'
        this.whiteList = {}
    }

    /**
     * 重置搜索条件
     */
    reset() {
        this.vehicleNo = '';
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.loadData()
    }

    /**
     * 验证数据合法性
     */
    validate() {
        let flag = true
        if (this._regularService.isBlank(this.whiteList.vehicleNo)) {
            flag = false
            this.toastr.error('车牌号不能为空！')
        }
        if (this._regularService.isBlank(this.whiteList.controlBegin)) {
            flag = false
            this.toastr.error('布控时间不能为空！')
        }
        return flag
    }
}
