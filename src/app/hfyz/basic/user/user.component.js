"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var UserComponent = (function () {
    function UserComponent(_renderer, _router, _activatedRoute, _toastr, _userService, _inj, _regularService, _roleService, _authService) {
        this._renderer = _renderer;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this._toastr = _toastr;
        this._userService = _userService;
        this._inj = _inj;
        this._regularService = _regularService;
        this._roleService = _roleService;
        this._authService = _authService;
        this.currentRoleArray = [];
        this.displayDialog = false;
        // this.layoutComponent = this.inj.get(LayoutComponent);
        this.currentUserId = this._authService.getCurrentUser('id');
        this.currentRoleArray = this._authService.getCurrentUser('roleId').split(';');
        console.log(this.currentRoleArray);
        this.currentRoleString = this._authService.getCurrentUser('roleId');
        this.user = { id: '', operator: this.currentUserId };
        this.initData();
        // this.username=this.inj.get('username');
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent.prototype.initData = function () {
        var _this = this;
        this._userService.list(this.currentUserId).subscribe(function (res) {
            _this.userList = res.userList;
        });
    };
    UserComponent.prototype.onEdit = function (user) {
        var _this = this;
        this._userService.edit(user.id).subscribe(function (res) {
            if (res.result == 'success') {
                _this.user = res.user;
                _this.roleList = res.roleList;
                console.log(_this.user.roles);
                _this.displayDialog = true;
                _this.isAdd = false;
                _this.formTitle = '编辑用户——' + user.name;
            }
            else {
                _this._toastr.error('获取数据失败');
            }
        });
    };
    UserComponent.prototype.onCreate = function () {
        var _this = this;
        this.user.roles = null;
        this._roleService.listForSelect(this.currentRoleString, this.currentUserId).subscribe(function (res) {
            _this.roleList = res.roleList;
            _this.orgList = res.orgList;
            _this.formTitle = '新增用户';
            _this.isAdd = true;
            _this.displayDialog = true;
            _this.user = { id: '', operator: _this.currentUserId };
        });
    };
    UserComponent.prototype.save = function () {
        var _this = this;
        if (this.validate()) {
            this._userService.save(this.user).subscribe(function (res) {
                _this._toastr.success('保存成功');
                _this.initData();
            });
            this.displayDialog = false;
        }
    };
    UserComponent.prototype.update = function () {
        var _this = this;
        if (this.validate()) {
            this._userService.update(this.user.id, this.user).subscribe(function (res) {
                _this._toastr.success('修改成功');
                _this.initData();
            });
            this.displayDialog = false;
        }
    };
    UserComponent.prototype.onDelete = function (user) {
        var _this = this;
        if (confirm('确认移除用户——' + user.name + '？')) {
            this._userService.delete(user.id).subscribe(function (res) {
                _this.initData();
                _this._toastr.info("\u6210\u529F\u79FB\u9664\u7528\u6237\u2014\u2014" + user.name);
            });
        }
    };
    UserComponent.prototype.validate = function () {
        var result = true;
        if (this._regularService.isBlank(this.user.name)) {
            this._toastr.error('名称不能为空');
            result = false;
        }
        if (this._regularService.isBlank(this.user.password)) {
            this._toastr.error('密码不能为空');
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
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        selector: 'user',
        templateUrl: 'user.component.html',
        styleUrls: ['../../layout/layout.component.css']
    })
], UserComponent);
exports.UserComponent = UserComponent;
;
