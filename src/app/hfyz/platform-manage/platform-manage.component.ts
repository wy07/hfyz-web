import {Component, Injector, OnInit, Renderer} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlatformManageService} from './shared/platform-manage.service';
import {RegularService} from './../common/shared/regular.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-platform-manage',
  templateUrl: './platform-manage.component.html',
  styleUrls: ['./platform-manage.component.css']
})
export class PlatformManageComponent implements OnInit {
  platformList: any[];
  platform: any;

  name: string;
  code: string;

  displayDialog: boolean;
  isDetails: boolean;
  formTitle: string;
  isAdd: boolean;
  max: number;
  total: number;
  currentPage: number;

  constructor(private renderer: Renderer
    , private toastr: ToastsManager
    , private platformService: PlatformManageService
    , private regularService: RegularService) {
    this.displayDialog = false;
    this.isDetails = false;
    this.platform = {};
    this.clearForm();
    this.max = 10;
  }

  ngOnInit() {
    this.initData();
  }

  initData(offset = 0) {
    this.platformService.list(this.max, offset, this.name, this.code).subscribe(
      res => {
        this.platformList = res.platformList.platformList;
        this.total = res.platformList.total;
      }
    );
  }

  // 点击分页按钮
  paginate(event) {
    if (this.currentPage !== event.page) {
      this.currentPage = event.page;
      this.initData(this.max * event.page);
    }
  }

  // 重置
  onReset() {
    this.name = '';
    this.code = '';
    this.initData();
  }

  // 新增
  onCreat() {
    this.clearForm();
    this.formTitle = '平台新增';
    this.isAdd = true;
    this.displayDialog = true;
  }

  onSave() {
    if (this.validate()) {
      this.platformService.save(this.platform).subscribe(
        res => {
          this.toastr.success('保存成功');
          this.initData();
          this.displayDialog = false;
        }
      );
    }
  }

  // 查看编辑
  onEdit(platform) {
    this.clearForm();
    this.formTitle = `平台编辑`;
    this.isAdd = false;
    this.displayDialog = true;
    this.preEdit(platform.id);
  }

  preEdit(id) {
    if (this.displayDialog === false) {
      this.isDetails = true;
    }
    this.platformService.edit(id).subscribe(
      res => {
        if (res.result === 'success') {
          this.platform = res.platform;
        } else {
          this.toastr.error('获取数据失败');
        }
      }
    );
  }

  update() {
    if (this.validate()) {
      this.platformService.update(this.platform.id, this.platform).subscribe(
        res => {
          this.toastr.success('保存成功');
          this.initData();
          this.displayDialog = false;
        }
      );
    }
  }

  cancle() {
    this.displayDialog = false;
  }

  validate() {
    // IP地址验证
    if (this.regularService.isBlank(this.platform.ip)) {
      this.toastr.error('平台IP地址不能为空');
      return false;
    }
    if (this.platform.ip === '0.0.0.0' || this.platform.ip === '255.255.255.255' ||
      !(this.platform.ip.match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/))) {
      this.toastr.error('请输入正确的IP地址');
      return false;
    }
    if (this.regularService.isBlank(this.platform.port)) {
      this.toastr.error('端口号不能为空');
      return false;
    }
    if (this.regularService.isBlank(this.platform.name)) {
      this.toastr.error('平台名称不能为空');
      return false;
    }
    if (this.regularService.isBlank(this.platform.code)) {
      this.toastr.error('平台代码不能为空');
      return false;
    }
    if (this.regularService.isBlank(this.platform.contactName)) {
      this.toastr.error('平台联系人不能为空');
      return false;
    }
    if (this.regularService.isBlank(this.platform.contactPhone)) {
      this.toastr.error('平台联系电话不能为空');
      return false;
    }
    return true;
  }


  // 删除
  onDelete(platform) {
    if (confirm('确认移除"' + platform.name + '"平台？')) {
      this.platformService.delete(platform.id).subscribe(
        res => {
          this.initData();
          this.toastr.info(`移除数据成功`);
        }
      );
    }
  }

  // 返回
  return() {
    this.isDetails = false;
  }

// 清除dialog数据
  clearForm() {
    this.platform = {};
  }

}
