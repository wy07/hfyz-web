import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.css']
})
export class BlackListComponent implements OnInit {
  addFlag: boolean // 切换新增页面的flag，初始为true，显示列表
  vehicleNo: string // 车辆号牌
  dateBegin: string // 开始时间
  dateEnd: string // 结束时间

  constructor() {
    this.addFlag = false;
  }

  ngOnInit() {
  }

  /**
   * 新增页面切换
   */
  switchPage() {
    this.addFlag = !this.addFlag
  }

  /**
   * 重置搜索条件
   */
  reset() {
    this.vehicleNo = '';
    this.dateBegin = '';
    this.dateEnd = ''
  }

  /**
   * 提交新增内容
   */
  submit() {
    this.switchPage();
  }
}
