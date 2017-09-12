import { Component, OnInit } from '@angular/core';
import { PlatformManageService } from './shared/platform-manage.service';
import { RegularService } from './../common/shared/regular.service';
import { ToastsManager } from 'ng2-toastr';
import { TdLoadingService } from '@covalent/core';
import { CustomDialogService } from '../common/shared/custom-dialog.service';

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
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    constructor(private toastr: ToastsManager
        , private platformService: PlatformManageService
        , private regularService: RegularService
        , private _loadingService: TdLoadingService
        , private _customDialogService: CustomDialogService) {
        this.platform = {};
        this.clearForm();
        this.pageMax = 10;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.action = 'list';
    }

    ngOnInit() {
        this.initData();
    }

    initData() {
        this._loadingService.register();
        this.platformService.list(this.pageMax, this.pageFirst, this.name, this.code).subscribe(
            res => {
                this._loadingService.resolve();
                this.platformList = res.platformList.platformList;
                this.pageTotal = res.platformList.total;
                this.pageOffset = this.pageFirst;
            }
        );
    }

    // 点击分页按钮
    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.initData();
        }
    }

    // 重置
    onReset() {
        this.name = '';
        this.code = '';
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.initData();
    }

    onSearch() {
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.initData();
    }

    // 新增
    onCreat() {
        this.clearForm();
        this.formTitle = '新增';
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
        this.formTitle = `编辑`;
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
        const msg = '确认删除平台为【' + platform.name + '】的记录吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this.platformService.delete(platform.id).subscribe(res => {
                    this._loadingService.resolve();
                    this.toastr.info('删除成功')
                    this.initData();
                })
            }
        })
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
