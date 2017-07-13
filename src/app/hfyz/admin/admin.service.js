"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AdminService = (function () {
    function AdminService(restangular, _authService) {
        this.restangular = restangular;
        this._authService = _authService;
    }
    AdminService.prototype.getRoles = function () {
        return this.restangular.all('sysusers').customGET('getRoles');
        /*return this.http.get(environment.grailsUrl+'sysuser/getRoles',this.getAuthHeader()).toPromise().then(res=> {
            return res.json()
        }, error=> {
            this._authService.renderPage(error)
        })*/
    };
    AdminService.prototype.getUserByName = function (name) {
        console.log(name);
        return this.restangular.all('sysusers').customGET('getUserByName', { name: name });
        /*return this.http.get(environment.grailsUrl+'sysuser/getUserByName?name='+name,this.getAuthHeader()).toPromise().then(res=> {
          return res.json()
        }, error=> {
          this._authService.renderPage(error)
        })*/
    };
    return AdminService;
}());
AdminService = __decorate([
    core_1.Injectable()
], AdminService);
exports.AdminService = AdminService;
