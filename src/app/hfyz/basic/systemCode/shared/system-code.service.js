"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var SystemCodeService = (function () {
    function SystemCodeService(restangular) {
        this.restangular = restangular;
    }
    SystemCodeService.prototype.index = function () {
        return this.restangular.all('system-codes').customGET('index', {});
    };
    SystemCodeService.prototype.list = function (parentId, type) {
        return this.restangular.all('system-codes').customGET('list', { parentId: parentId, type: type });
    };
    SystemCodeService.prototype.delete = function (id, type) {
        return this.restangular.one('system-codes', id).customDELETE('delete', { type: type });
    };
    SystemCodeService.prototype.edit = function (id, type) {
        return this.restangular.one('system-codes', id).customGET('edit', { type: type });
    };
    SystemCodeService.prototype.search = function (query, type) {
        return this.restangular.all('system-codes').customGET('search', {
            query: query,
            type: type
        });
    };
    SystemCodeService.prototype.save = function (formData, type) {
        return this.restangular.all('system-codes').customPOST(formData, 'save', { type: type });
    };
    SystemCodeService.prototype.update = function (id, formData, type) {
        return this.restangular.one('system-codes', id).customPOST(formData, 'update', { type: type });
    };
    return SystemCodeService;
}());
SystemCodeService = __decorate([
    core_1.Injectable()
], SystemCodeService);
exports.SystemCodeService = SystemCodeService;
