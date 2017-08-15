import { Component, OnInit } from '@angular/core';
import { PlatformManageService } from './shared/platform-manage.service';
import { RegularService } from './../common/shared/regular.service';
import { ToastsManager } from 'ng2-toastr';
import { TdLoadingService } from "@covalent/core";

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
    action: string;

    formTitle: string;
    isAdd: boolean;
    max: number;
    total: number;
    currentPage: number;

    constructor(private toastr: ToastsManager
        , private platformService: PlatformManageService
        , private regularService: RegularService
        , private _loadingService: TdLoadingService) {
        this.platform = {};
        this.clearForm();
        this.max = 10;
        this.action = 'list';
    }

    ngOnInit() {
        this.initData();
    }

    initData(offset = 0) {
        this._loadingService.register();
        this.platformService.list(this.max, offset, this.name, this.code).subscribe(
            res => {
                this._loadingService.resolve();
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
        this.action = 'update';
    }

    onSave() {
        if (this.validate()) {
            this.platformService.save(this.platform).subscribe(
                res => {
                    this.toastr.success('保存成功');
                    this.initData();
                    this.action = 'list';
                }
            );
        }
    }

    // 查看编辑
    onEdit(platform) {
        this.clearForm();
        this.formTitle = `平台编辑`;
        this.isAdd = false;
        this.action = 'update';
        this.preEdit(platform.id);
    }

    onShow(id) {
        this.action = 'show';
        this.preEdit(id);
    }

    preEdit(id) {
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
                    this.action = 'list';
                }
            );
        }
    }

    cancle() {
        this.action = 'list';
    }

    validate() {
        // IP地址验证
        if (this.regularService.isBlank(this.platform.ip)) {
            this.toastr.error('平台IP地址不能为空');
            return false;
        }
        if (this.platform.ip === '0.0.0.0' || this.platform.ip === '255.255.255.255' || !(this.platform.ip.match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/))) {
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
        this.action = 'list';
    }

    // 清除dialog数据
    clearForm() {
        this.platform = {};
    }

}
