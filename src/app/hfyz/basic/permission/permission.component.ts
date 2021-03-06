import { RegularService } from '../../common/shared/regular.service';
import {
    Component,
    OnInit
} from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { TdLoadingService } from "@covalent/core";
import { PermissionService } from "./permission.service";
import {CustomDialogService} from '../../common/shared/custom-dialog.service';

@Component({
    selector: 'permission',
    templateUrl: 'permission.component.html',
    styleUrls: ['../../layout/layout.component.css']
})

export class PermissionComponent implements OnInit {

    action: string;

    max: number;
    currentPage: number;
    totalPerms: number;
    permList: any;

    formTitle: string;
    perm: any;
    isAdd: boolean;

    constructor(private _toastr: ToastsManager
        , private _permService: PermissionService
        , private _loadingService: TdLoadingService
        , private _regularService: RegularService
        , private _customDialogService: CustomDialogService) {

        this.action = 'list';
        this.max = 10;
        this.currentPage = 0;
        this.totalPerms = 0;
        this.perm = {};
    }

    ngOnInit() {
        this.initData();
    }


    initData(offset = 0) {
        this._loadingService.register();
        this._permService.list(this.max, offset).subscribe(
            res => {
                this._loadingService.resolve();
                this.permList = res.permList;
                this.totalPerms = res.permCount;
            }
        );
    }

    onEdit(perm) {
        this.action = 'update';
        this.isAdd = false;
        this.formTitle = '编辑';
        this.preEdit(perm.id)
    }

    preEdit(id) {
        this._permService.edit(id).subscribe(
            res => {
                this.perm = res.perm;
            }
        );

    }


    onCreate() {
        this.formTitle = '新增';
        this.isAdd = true;
        this.perm = {};
        this.action = 'update';
    }

    save() {
        if (this.validate()) {
            const params = {
                category: this.perm.category
                , name: this.perm.name
                , code: this.perm.code
                , httpMethod: this.perm.httpMethod ? this.perm.httpMethod : ''
                , url: this.perm.url
            };
            this._permService.save(params).subscribe(
                res => {
                    this.action = 'list';
                    this._toastr.success('保存成功！');
                    this.initData();
                }
            );

        }
    }

    update() {
        if (this.validate()) {
            const params = {
                category: this.perm.category
                , name: this.perm.name
                , code: this.perm.code
                , httpMethod: this.perm.httpMethod ? this.perm.httpMethod : ''
                , url: this.perm.url
            };
            this._permService.update(this.perm.id, params).subscribe(
                res => {
                    this.action = 'list';
                    this._toastr.success('修改成功！');
                    this.initData()
                }
            );
        }

    }

    onDelete(perm) {
        const msg = '确认删除权限为【' + perm.name + '】的记录吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._permService.delete(perm.id).subscribe(res => {
                    this._loadingService.resolve();
                    this._toastr.info('删除成功！');
                    this.initData();
                })
            }
        })
    }


    paginate(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.initData(this.max * event.page);
        }
    }


    validate() {
        if (this._regularService.isBlank(this.perm.name)) {
            this._toastr.error('名称不能为空！');
            return false;
        }

        if (this._regularService.isBlank(this.perm.code)) {
            this._toastr.error('编码不能为空！');
            return false;
        }

        if (this._regularService.isBlank(this.perm.category)) {
            this._toastr.error('权限分组不能为空！');
            return false;
        }

        if (this._regularService.isBlank(this.perm.url)) {
            this._toastr.error('URL不能为空！');
            return false;
        }

        return true;
    }

}
