import {Component, OnInit} from '@angular/core';
import {PeopleService} from '../shared/people.service';
import {TdLoadingService} from "@covalent/core";


@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
    max: number;   // 表格行数
    page: number;   // 当前页数
    total: number;  // 总数

    peopleList: any[]; // 返回结果集
    peopleName: string; // 搜索条件-姓名
    phoneNo: string; // 搜索条件 -手机号
    IDCardNo: string; // 搜索条件-身份证号码

    pageFlag: boolean; // 页面切换
    pageTitle: string; // 详情页标题

    checkMember: any; // 考核员
    coach: any; // 教练员
    driver: any; // 驾驶员
    manager: any; // 押运装卸管理员
    technology: any; // 维修技术人员
    waiter: any; // 站场服务人员

    types: any[]; // 人员分类
    selectedType: string; // 选中的种类

    constructor(private _peopleService: PeopleService
        , private _loadingService: TdLoadingService) {
        this.max = 10;
        this.page = 0;
        this.total = 0;
        this.peopleList = [];
        this.peopleName = '';
        this.phoneNo = '';
        this.IDCardNo = '';
        this.types = [
            {label: '-- 人员类型 --', value: ''},
            {label: '考核员', value: '考核员'},
            {label: '教练员', value: '教练员'},
            {label: '驾驶员', value: '驾驶员'},
            {label: '押运装卸管理员', value: '押运装卸管理员'},
            {label: '维修人员', value: '维修人员'},
            {label: '站场服务人员', value: '站场服务人员'}];
        this.selectedType = '';

        this.pageFlag = true;
        this.pageTitle = '详情';
        this.checkMember = {};
        this.coach = {};
        this.driver = {};
        this.manager = {};
        this.technology = {};
        this.waiter = {};
    }

    ngOnInit() {
        this.loadData();
    }

    /**
     *加载表格数据
     * @param offset 分页offset值
     */
    loadData(offset = 0) {
        this._loadingService.register();
        this._peopleService.search(this.selectedType, this.peopleName, this.phoneNo, this.IDCardNo, this.max, offset).subscribe(
            res => {
                this._loadingService.resolve();
                this.peopleList = res.resultList;
                this.total = res.total;
            }
        );
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
     * 表格按条件搜索
     */
    search() {
        this.loadData();
    }

    cancel() {
        this.selectedType = '';
        this.peopleName = '';
        this.phoneNo = '';
        this.IDCardNo = '';
    }

    /**
     * 表格查看详情
     * @param people 表格当前row数据
     */
    moreInfo(people) {
        this.pageFlag = false;
        this.pageTitle = people.name + '的详情信息';
        this._peopleService.moreInfo(people.IDCardNo).subscribe(
            res => {
                this.checkMember = res.checkMember;
                this.coach = res.coach;
                this.driver = res.driver;
                this.manager = res.manager;
                this.technology = res.tech;
                this.waiter = res.waiter;
            }
        );
    }

    /**
     * 关闭对话框
     */
    closeDialog() {
        this.pageFlag = true;
        this.checkMember = {};
        this.coach = {};
        this.driver = {};
        this.manager = {};
        this.technology = {};
        this.waiter = {};
    }
}
