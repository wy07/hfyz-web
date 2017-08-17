import {TdLoadingService} from '@covalent/core';
import {RoleService} from './../role/role.service';
import {AuthService} from './../../security/auth.service';
import {RegularService} from './../../common/shared/regular.service';
import {Component, OnInit, Injector, Renderer, ElementRef, ViewChild} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {Router, ActivatedRoute} from '@angular/router';
import {TreeNode} from 'primeng/components/common/api';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';
import {MultiSelectModule, SelectItem} from 'primeng/primeng';
import {ListboxModule} from 'primeng/primeng';

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

    constructor(private _renderer: Renderer
        , private _router: Router
        , private _activatedRoute: ActivatedRoute
        , private _toastr: ToastsManager
        , private _userService: UserService
        , private _inj: Injector
        , private _regularService: RegularService
        , private _roleService: RoleService
        , private _loadingService: TdLoadingService
        , private _authService: AuthService) {

        this.action = 'list';
        this.max = 10;
        this.currentPage = 0;
        this.totalUsers = 0;
        this.user = {};


        this.displayDialog = false;
        // this.layoutComponent = this.inj.get(LayoutComponent);
        this.currentUserId = this._authService.getCurrentUser('id');
        this.currentRoleString = this._authService.getCurrentUser('roleId');
        this.user = {id: '', operator: this.currentUserId};
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
            }
        );
    }

    onEdit(user) {
        this.action = 'update';
        this.isAdd = false;
        this.formTitle = '编辑' + user.name;

        this._userService.edit(user.id).subscribe(
            res => {
                console.log(JSON.stringify(res))
                this.user = res.user;
                this.roleList = res.roleList;
                this.orgList = res.orgList;
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
            }
        );
    }

    save() {
        if (this.validate()) {
            this.user.org = {id: this.user.orgId};
            this._userService.save(this.user).subscribe(
                res => {
                    this.action = 'list';
                    this._toastr.success('保存成功');
                    this.initData();
                }
            );

        }
    }

    update() {
        if (this.validate()) {
            console.log(this.user.roles)
            this._userService.update(this.user.id, this.user).subscribe(
                res => {
                    this.action = 'list';
                    this._toastr.success('修改成功');
                    this.initData()
                }
            );
            this.displayDialog = false
        }

    }

    onDelete(user) {
        if (confirm('确认移除用户——' + user.name + '？')) {
            this._userService.delete(user.id).subscribe(
                res => {
                    this.initData()
                    this._toastr.info(`成功移除用户——` + user.name);
                }
            );
        }
    }

    onResetPassword(user) {
        if (confirm(' 您确定要重置' + user.username + '的密码吗' + '？')) {
            this._userService.resetPassword(user.id).subscribe(
                res => {
                    this._toastr.info(`重置密码成功` + user.username);
                    alert(user.username + '的随机密码为：' + res.newPassword);
                }
            );
        }
    }

    paginate(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.initData(this.max * event.page);
        }
    }

    validate() {
        let result = true
        if (this._regularService.isBlank(this.user.name)) {
            this._toastr.error('名称不能为空');
            result = false;
        }
        if (this._regularService.isBlank(this.user.roles)) {
            this._toastr.error('角色不能为空');
            result = false;
        }
        if (this._regularService.isBlank(this.user.username)) {
            this._toastr.error(' 账号不能为空');
            result = false;
        }

        return result;
    }
}
