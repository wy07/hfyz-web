"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var RoleComponent = (function () {
    function RoleComponent(_renderer, _router, _activatedRoute, _toastr, _roleService, _inj, _regularService, _authService) {
        this._renderer = _renderer;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this._toastr = _toastr;
        this._roleService = _roleService;
        this._inj = _inj;
        this._regularService = _regularService;
        this._authService = _authService;
        //layoutComponent
        this.displayDialog = false;
        this.displayAssign = false;
        this.currentRoleArray = [];
        this.currentRoleArray = this._authService.getCurrentUser('roleId').split(';');
        this.currentRoleString = this._authService.getCurrentUser('roleId');
        this.currentUserId = this._authService.getCurrentUser('id');
        //this.layoutComponent = this._inj.get(LayoutComponent);
        this.role = { id: '' };
        this.initData();
        console.log('!!!!');
    }
    RoleComponent.prototype.ngOnInit = function () {
        console.log('!!!!');
    };
    RoleComponent.prototype.initData = function () {
        var _this = this;
        this._roleService.list(this.currentUserId).subscribe(function (res) {
            _this.roleList = res.roleList;
        });
    };
    RoleComponent.prototype.onEdit = function (role) {
        this.displayDialog = true;
        this.isAdd = false;
        this.formTitle = '编辑角色——' + role.name;
        this.preEdit(role.id);
    };
    RoleComponent.prototype.preEdit = function (id) {
        var _this = this;
        this._roleService.edit(id, this.currentRoleString).subscribe(function (res) {
            if (res.result == 'success') {
                _this.role = res.role;
                _this.orgList = res.orgList;
            }
            else {
                _this._toastr.error('获取数据失败');
            }
        });
    };
    RoleComponent.prototype.onCreate = function () {
        var _this = this;
        this._roleService.orgListForSelect(this.currentRoleString).subscribe(function (res) {
            _this.orgList = res.orgList;
            _this.formTitle = '新增角色';
            _this.isAdd = true;
            _this.displayDialog = true;
            _this.role = { id: '', operator: _this.currentUserId };
        });
    };
    RoleComponent.prototype.save = function () {
        var _this = this;
        if (this.validate()) {
            this._roleService.save(this.role).subscribe(function (res) {
                _this._toastr.success('保存成功');
                _this.initData();
            });
            this.displayDialog = false;
        }
    };
    RoleComponent.prototype.update = function () {
        var _this = this;
        if (this.validate()) {
            this._roleService.update(this.role.id, this.role).subscribe(function (res) {
                _this._toastr.success('修改成功');
                _this.initData();
            });
            this.displayDialog = false;
        }
    };
    RoleComponent.prototype.onDelete = function (role) {
        var _this = this;
        if (confirm('确认移除角色——' + role.name + '？')) {
            this._roleService.delete(role.id).subscribe(function (res) {
                _this.initData();
                _this._toastr.info("\u6210\u529F\u79FB\u9664\u89D2\u8272\u2014\u2014" + role.name);
            });
        }
    };
    RoleComponent.prototype.onAssign = function (role) {
        var _this = this;
        this._roleService.getPermission(this.currentRoleString).subscribe(function (res) {
            _this.menuList = res.menuList;
            _this.role = role;
            _this.displayAssign = true;
            _this.selectedPermission = [];
        });
    };
    RoleComponent.prototype.showCreateDialog = function () { };
    RoleComponent.prototype.savePermission = function () {
        var _this = this;
        if (this.selectedPermission.length == []) {
            this._toastr.error('请为角色分配权限！');
        }
        else {
            this.displayAssign = false;
            var permissions = [];
            for (var i = 0; i < this.selectedPermission.length; i++) {
                permissions.push(this.selectedPermission[i].data);
            }
            this._roleService.savePermission(this.role.id, permissions).subscribe(function (res) {
                _this.initData();
                _this._toastr.info("\u6743\u9650\u5206\u914D\u6210\u529F\uFF01");
            });
        }
    };
    RoleComponent.prototype.validate = function () {
        if (this._regularService.isBlank(this.role.name)) {
            this._toastr.error('名称不能为空');
            return false;
        }
        if (this._regularService.isBlank(this.role.authority)) {
            this._toastr.error('编码不能为空');
            return false;
        }
        return true;
    };
    return RoleComponent;
}());
RoleComponent = __decorate([
    core_1.Component({
        selector: 'role',
        templateUrl: 'role.component.html',
        styleUrls: ['../../layout/layout.component.css']
    })
], RoleComponent);
exports.RoleComponent = RoleComponent;
