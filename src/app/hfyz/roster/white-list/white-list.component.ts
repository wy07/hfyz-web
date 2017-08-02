import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-white-list',
  templateUrl: './white-list.component.html',
  styleUrls: ['./white-list.component.css']
})
export class WhiteListComponent implements OnInit {
  addFlag: boolean // 切换新增页面的flag，初始为true，显示列表
  vehicleNo: string // 车辆号牌

  constructor() {
    this.addFlag = false
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
  }

  /**
   * 提交新增内容
   */
  submit() {
    this.switchPage();
  }
}
