import { AuthService } from '../../security/auth.service';
import { RegularService } from '../../common/shared/regular.service';
import {
    Component,
    OnInit
} from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { TreeNode } from 'primeng/components/common/api';
import { RoleService } from './role.service';
import { SelectItem } from 'primeng/primeng';
import { TdLoadingService } from "@covalent/core";
import {CustomDialogService} from '../../common/shared/custom-dialog.service';
@Component({
    selector: 'role',
    templateUrl: 'role.component.html',
    styleUrls: ['../../layout/layout.component.css']
})

export class RoleComponent implements OnInit {

    action: string;

    max: number;
    currentPage: number;
    totalRoles: number;
    roleList: any;

    type: number;
    formTitle: string;
    role: any;
    isAdd: boolean;
    permList: TreeNode[];
    selectedPerms: TreeNode[];
    orgList: SelectItem[];
    currentUserId: number;
    currentRoleString: string;

    assignRoleId: number;

    constructor(private _toastr: ToastsManager
        , private _roleService: RoleService
        , private _loadingService: TdLoadingService
        , private _regularService: RegularService
        , private _authService: AuthService
        , private _customDialogService: CustomDialogService) {

        this.action = 'list';
        this.max = 10;
        this.currentPage = 0;
        this.totalRoles = 0;

        this.currentRoleString = this._authService.getCurrentUser('roleId')
        this.currentUserId = this._authService.getCurrentUser('id')
        this.role = { id: '' };
    }

    ngOnInit() {
        this.initData();
    }


    initData(offset = 0) {
        this._loadingService.register();
        this._roleService.list(this.max, offset).subscribe(
            res => {
                this._loadingService.resolve();
                this.roleList = res.roleList;
                this.totalRoles = res.roleCount;
            }
        );
    }

    onEdit(role) {
        this.action = 'update';
        this.isAdd = false;
        this.formTitle = '编辑';
        this.preEdit(role.id)
    }

    preEdit(id) {
        this._roleService.edit(id, this.currentRoleString).subscribe(
            res => {
                if (res.result === 'success') {
                    this.role = res.role;
                    this.orgList = res.orgList;
                } else {
                    this._toastr.error('获取数据失败！');
                }
            }
        );

    }

    onCreate() {
        this._roleService.orgListForSelect(this.currentRoleString).subscribe(
            res => {
                this.orgList = res.orgList;
                this.formTitle = '新增';
                this.isAdd = true;
                this.action = 'update';
                this.role = { id: '', operator: this.currentUserId };
            })
    }

    save() {
        if (this.validate()) {
            this.role.org = { id: this.role.orgId };
            this._roleService.save(this.role).subscribe(
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
            this.role.org = { id: this.role.orgId };
            this._roleService.update(this.role.id, this.role).subscribe(
                res => {
                    this.action = 'list';
                    this._toastr.success('修改成功！');
                    this.initData()
                }
            );
        }

    }

    onDelete(role) {
        const msg = '确认删除角色为【' + role.name + '】的记录吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._roleService.delete(role.id).subscribe(res => {
                    this._loadingService.resolve();
                    this._toastr.info('删除成功！');
                    this.initData()
                })
            }
        })
    }

    onAssign(roleId) {
        this.assignRoleId = roleId;
        this._roleService.preAssignPerm(roleId).subscribe(
            res => {
                this.action = 'assign';
                this.permList = res.perms;
                this.selectedPerms = [];
                for (const pPerm of this.permList) {
                    for (let perm of pPerm.children) {
                        if (perm.data.selected) {
                            this.selectedPerms.push(perm);
                        }
                    }
                }
            }
        );
    }

    paginate(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.initData(this.max * event.page);
        }
    }

    savePermission() {
        if (this.selectedPerms === []) {
            this._toastr.error('请为角色分配权限！');
        } else {
            const permissions = [];
            for (let i = 0; i < this.selectedPerms.length; i++) {
                if (!this._regularService.isBlank(this.selectedPerms[i].data)) {
                    permissions.push(this.selectedPerms[i].data.id)
                }

            }
            const msg = '确认分配该权限？';
            const title = '提示';
            this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
                if (accept) {
                    this._loadingService.register();
                    this._roleService.savePermission(this.assignRoleId, permissions).subscribe(res => {
                        this._loadingService.resolve();
                        this._toastr.success('分配成功！');
                        this.action = 'list';
                        this.initData();
                    })
                }
            })
        }

    }

    validate() {
        if (this._regularService.isBlank(this.role.name)) {
            this._toastr.error('名称不能为空！');
            return false;
        }

        if (this._regularService.isBlank(this.role.authority)) {
            this._toastr.error('编码不能为空！');
            return false;
        }

        return true;
    }

}
