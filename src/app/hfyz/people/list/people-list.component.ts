import {Component, OnInit} from '@angular/core';
import {PeopleService} from '../shared/people.service';


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

  displayDialog: boolean; // 对话框flag

  checkMember: any; // 考核员
  coach: any; // 教练员
  driver: any; // 驾驶员
  manager: any; // 押运装卸管理员
  technology: any; // 维修技术人员
  waiter: any; // 站场服务人员

  constructor(private _peopleService: PeopleService) {
    this.max = 10;
    this.page = 0;
    this.total = 0;
    this.peopleList = [];
    this.peopleName = '';
    this.phoneNo = '';
    this.IDCardNo = '';
    this.loadData();

    this.displayDialog = false;
    this.checkMember = {};
    this.coach = {};
    this.driver = {};
    this.manager = {};
    this.technology = {};
    this.waiter = {};
  }

  ngOnInit() {
  }

  /**
   *加载表格数据
   * @param offset 分页offset值
   */
  loadData(offset = 0) {
    this._peopleService.search(this.peopleName, this.phoneNo, this.IDCardNo, this.max, offset).subscribe(
      res => {
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

  /**
   * 表格查看详情
   * @param people 表格当前row数据
   */
  moreInfo(people) {
    this.displayDialog = true;
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
    this.displayDialog = false;
    this.checkMember = {};
    this.coach = {};
    this.driver = {};
    this.manager = {};
    this.technology = {};
    this.waiter = {};
  }
}
