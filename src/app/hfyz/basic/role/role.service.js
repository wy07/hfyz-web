"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var RoleService = (function () {
    function RoleService(restangular) {
        this.restangular = restangular;
    }
    RoleService.prototype.list = function (operatorId) {
        return this.restangular.all('roles').customGET('list', { operatorId: operatorId });
    };
    RoleService.prototype.delete = function (id) {
        return this.restangular.one('roles', id).customDELETE('delete', {});
    };
    RoleService.prototype.edit = function (id, roles) {
        return this.restangular.one('roles', id).customGET('edit', { roles: roles });
    };
    RoleService.prototype.save = function (formData) {
        return this.restangular.all('roles').customPOST(formData, 'save');
    };
    RoleService.prototype.update = function (id, formData) {
        return this.restangular.one('roles', id).customPOST(formData, 'update');
    };
    RoleService.prototype.getPermission = function (roles) {
        return this.restangular.all('permissionGroups').customGET('list', { roles: roles });
    };
    RoleService.prototype.savePermission = function (id, permissions) {
        return this.restangular.one('permissionGroups', id).customPOST(permissions, 'save');
    };
    RoleService.prototype.listForSelect = function (roles, operatorId) {
        return this.restangular.all('roles').customGET('listForSelect', { roles: roles, operatorId: operatorId });
    };
    RoleService.prototype.orgListForSelect = function (roles) {
        return this.restangular.all('organizations').customGET('listForSelect', { roles: roles });
    };
    return RoleService;
}());
RoleService = __decorate([
    core_1.Injectable()
], RoleService);
exports.RoleService = RoleService;
