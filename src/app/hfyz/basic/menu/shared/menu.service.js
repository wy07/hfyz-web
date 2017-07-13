"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var MenuService = (function () {
    function MenuService(restangular) {
        this.restangular = restangular;
    }
    MenuService.prototype.list = function (parentId) {
        return this.restangular.all('menus').customGET('list', { parentId: parentId });
    };
    MenuService.prototype.types = function () {
        return this.restangular.all('menus').customGET('type-list');
    };
    MenuService.prototype.delete = function (id) {
        return this.restangular.one('menus', id).customDELETE('delete', {});
    };
    MenuService.prototype.edit = function (id) {
        return this.restangular.one('menus', id).customGET('edit');
    };
    MenuService.prototype.save = function (formData) {
        return this.restangular.all('menus').customPOST(formData, 'save');
    };
    MenuService.prototype.update = function (id, formData) {
        return this.restangular.one('menus', id).customPOST(formData, 'update');
    };
    MenuService.prototype.search = function (position, query) {
        return this.restangular.all('menus').customGET('search', {
            query: query,
            position: position
        });
    };
    return MenuService;
}());
MenuService = __decorate([
    core_1.Injectable()
], MenuService);
exports.MenuService = MenuService;
