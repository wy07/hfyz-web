"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AdminComponent = (function () {
    function AdminComponent(_adminService) {
        //let menu=this.elRef.nativeElement.parentElement.querySelector('#home')
        this._adminService = _adminService;
        this.title = "系统管理";
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.newitems = [
            { label: '角色', icon: 'fa-users' },
            { label: '用户', icon: 'fa-user' }
        ];
        this.loadRoles();
    };
    AdminComponent.prototype.loadRoles = function () {
        var _this = this;
        this._adminService.getRoles().then(function (roles) {
            _this.roles = roles;
            _this.selectedTree = roles[0];
            //this.changeSourceRight(this.selectedTree.data.type
            //	,this.selectedTree.data.id)
            //this.userForm.patchValue({role: roles[0].data.id})
        });
    };
    AdminComponent.prototype.onNew = function (event) {
    };
    AdminComponent.prototype.onEdit = function () {
    };
    AdminComponent.prototype.onDelete = function () {
    };
    AdminComponent.prototype.onSaveRights = function () {
    };
    AdminComponent.prototype.nodeSelect = function (event) {
    };
    AdminComponent.prototype.nodeExpand = function (event) {
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    core_1.Component({
        selector: 'admin',
        templateUrl: 'admin.component.html',
        styleUrls: ['../../app.component.css']
    })
], AdminComponent);
exports.AdminComponent = AdminComponent;
