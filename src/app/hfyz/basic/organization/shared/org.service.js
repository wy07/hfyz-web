"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var OrganizationService = (function () {
    function OrganizationService(restangular) {
        this.restangular = restangular;
    }
    OrganizationService.prototype.list = function () {
        return this.restangular.all('organizations').customGET('list');
    };
    OrganizationService.prototype.types = function () {
        return this.restangular.all('menus').customGET('type-list');
    };
    OrganizationService.prototype.delete = function (id) {
        return this.restangular.one('menus', id).customDELETE('delete', {});
    };
    OrganizationService.prototype.edit = function (id) {
        return this.restangular.one('menus', id).customGET('edit');
    };
    OrganizationService.prototype.save = function (formData) {
        return this.restangular.all('menus').customPOST(formData, 'save');
    };
    OrganizationService.prototype.update = function (id, formData) {
        return this.restangular.one('menus', id).customPOST(formData, 'update');
    };
    OrganizationService.prototype.search = function (position, query) {
        return this.restangular.all('menus').customGET('search', {
            query: query,
            position: position
        });
    };
    return OrganizationService;
}());
OrganizationService = __decorate([
    core_1.Injectable()
], OrganizationService);
exports.OrganizationService = OrganizationService;
