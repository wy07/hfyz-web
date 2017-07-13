"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/add/observable/of");
require("rxjs/add/operator/delay");
var UserService = (function () {
    function UserService(restangular) {
        this.restangular = restangular;
    }
    UserService.prototype.list = function (operatorId) {
        return this.restangular.all('sysusers').customGET('list', { operatorId: operatorId });
    };
    UserService.prototype.delete = function (id) {
        return this.restangular.one('sysusers', id).customDELETE('delete', {});
    };
    UserService.prototype.edit = function (id) {
        return this.restangular.one('sysusers', id).customGET('edit');
    };
    UserService.prototype.save = function (formData) {
        return this.restangular.all('sysusers').customPOST(formData, 'save');
    };
    UserService.prototype.update = function (id, formData) {
        return this.restangular.one('sysusers', id).customPOST(formData, 'update');
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable()
], UserService);
exports.UserService = UserService;
