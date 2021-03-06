import {TdLoadingService} from '@covalent/core';
import {RoleService} from './../role/role.service';
import {AuthService} from './../../security/auth.service';
import {RegularService} from './../../common/shared/regular.service';
import {Component, OnInit, Injector, Renderer, ElementRef, ViewChild} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from './user.service';
import {SelectItem} from 'primeng/primeng';
import {CustomDialogService} from '../../common/shared/custom-dialog.service';

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['../../layout/layout.component.css']
})

export class UserComponent implements OnInit {

    action: string;

    max: number;
    currentPage: number;
    totalUsers: number;
    userList: any[];

    type: number;
    layoutComponent
    displayDialog: boolean;
    formTitle: string
    user: any;
    isAdd: boolean;
    roleList: SelectItem[];
    orgList: SelectItem[];
    currentUserId: number
    currentRoleString: string
    selectedCompany: any;
    enterpirse: string;
    filteredEnterpirses: any[];
    ownerName: string;
    isAdmin: boolean;
    disabled: boolean;
    org: any;
    display: boolean;
    newPassword: any;
    constructor(private _renderer: Renderer
        , private _router: Router
        , private _activatedRoute: ActivatedRoute
        , private _toastr: ToastsManager
        , private _userService: UserService
        , private _inj: Injector
        , private _regularService: RegularService
        , private _roleService: RoleService
        , private _loadingService: TdLoadingService
        , private _authService: AuthService
        , private _customDialogService: CustomDialogService) {

        this.action = 'list';
        this.max = 10;
        this.currentPage = 0;
        this.totalUsers = 0;
        this.user = {};
        this.selectedCompany = {};
        this.org = {};
        this.disabled = false;
        this.displayDialog = false;
        this.display = false;
        this.newPassword = '';
        // this.layoutComponent = this.inj.get(LayoutComponent);
        this.currentUserId = this._authService.getCurrentUser('id');
        this.currentRoleString = this._authService.getCurrentUser('roleId');
        this.user = {id: '', operator: this.currentUserId};
        this.isAdmin = sessionStorage.getItem('orgId') === 'null';
    }

    ngOnInit() {
        this.initData();
    }


    initData(offset = 0) {
        this._loadingService.register();
        this._userService.list(this.max, offset).subscribe(
            res => {
                this._loadingService.resolve();
                this.userList = res.userList;
                this.totalUsers = res.totalUsers;
                this.disabled = false;
            }
        );
    }

    onEdit(user) {
        this.org = {};
        this.selectedCompany = {};
        this.action = 'update';
        this.isAdd = false;
        this.formTitle = '编辑';

        this._userService.edit(user.id).subscribe(
            res => {
                this.user = res.user;
                this.selectedCompany.info = res.user.enterpirse;
                this.ownerName = res.user.enterpirse;
                this.user.companyCode = res.user.companyCode;
                this.roleList = res.roleList;
                this.orgList = res.orgList;
                let i = this.orgList.length;
                while (i--) {
                    if (this.orgList[i].value === this.user.orgId) {
                        this.org = this.orgList[i];
                    }
                }
                if (this.user.orgCode === '24') {
                    this.disabled = true;
                }
            }
        );
    }

    onCreate() {
        this.user.roles = null;
        this._roleService.listForSelect(this.currentRoleString, this.currentUserId).subscribe(
            res => {
                this.roleList = res.roleList;
                this.orgList = res.orgList;
                this.formTitle = '新增';
                this.isAdd = true;
                this.action = 'update';
                this.user = {};
                this.selectedCompany = {};
            }
        );
    }

    save() {
        if (this.validate()) {
            if (this.org) {
                this.user.orgId = this.org.value;
                this.user.org = {id: this.user.orgId};
            }
            this._userService.save(this.user).subscribe(
                res => {
                    this.action = 'list';
                    this._toastr.success('保存成功！');
                    this.initData();
                }
            );
        }
    }

    filteredEnterpirse(event) {
        const query = event.query.trim();
        if (this._regularService.isBlank(query)) {
            return false;
        }

        this._userService.companyList(query).subscribe(
            res => {
                this.filteredEnterpirses = res.companyList;
                for (const item of this.filteredEnterpirses) {
                    item.info = `${item.ownerName}`;
                }
            }
        );
    }

    onSelect(event) {
        this.user.companyCode = event.companyCode;
        this.ownerName = event.ownerName;
    }

    update() {
        if (this.validate()) {
            if (this._regularService.isBlank(this.selectedCompany.info)) {
                this.user.companyCode = null;
                this.user.enterpirse = null;
            }
            if (this.org) {
                this.user.orgId = this.org.value;
                this.user.org = {id: this.user.orgId};
            }
            this._userService.update(this.user.id, this.user).subscribe(
                res => {
                    this.action = 'list';
                    this._toastr.success('修改成功！');
                    this.initData()
                }
            );
            this.displayDialog = false
        }

    }
    onChange() {
        if (this.org.code === '24') {
            this.disabled = true;
        }else {
            this.disabled = false;
            this.selectedCompany = {};
        }
    }
    onDelete(user) {
        const msg = '确认删除用户为【' + user.username + '】的记录吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._userService.delete(user.id).subscribe(res => {
                    this._loadingService.resolve();
                    this._toastr.info('删除成功！');
                    this.initData()
                })
            }
        })
    }

    onResetPassword(user) {
        const msg = '确认重置【' + user.username + '】的密码吗？';
        const title = '重置密码';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._userService.resetPassword(user.id).subscribe(res => {
                    this._loadingService.resolve();
                    this._toastr.success('重置密码成功！');
                    this.display = true;
                    this.newPassword = res.newPassword;
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

    cancel() {
        this.action = 'list';
        this.disabled = false;
    }

    validate() {
        if (this._regularService.isBlank(this.user.name)) {
            this._toastr.error('名称不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.user.roles)) {
            this._toastr.error('角色不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.user.username)) {
            this._toastr.error('账号不能为空！');
            return false;
        }
        if (this.isAdmin && this._regularService.isBlank(this.org)) {
            this._toastr.error('部门不能为空！');
            return false;
        }
        if (this.isAdmin && this.org.code === '24' && this._regularService.isBlank(this.user.companyCode)) {
            this._toastr.error('请选择业户名称！');
            return false;
        }
        if (this.isAdmin && this.org.code === '24' && !this._regularService.isBlank(this.selectedCompany)) {
            if (this.selectedCompany.info !== this.ownerName || this._regularService.isBlank(this.selectedCompany.info)) {
                this._toastr.error('请选择正确的业户名称！');
                return false;
            }
        }
        return true;
    }
}
