"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var OrganizationComponent = (function () {
    function OrganizationComponent(_orgService, renderer) {
        this._orgService = _orgService;
        this.renderer = renderer;
        this.initData();
    }
    OrganizationComponent.prototype.initData = function () {
        var _this = this;
        this._orgService.list().subscribe(function (res) {
            console.log(res.orgList);
            // this.orgList=[res.orgList];
            _this.orgList = res.orgList;
        });
    };
    OrganizationComponent.prototype.loadNode = function (event) {
        // alert('dsf');
        if (event.node && !event.node.children) {
            this._orgService.list().subscribe(function (res) {
                event.node.children = res.orgList;
            });
        }
    };
    OrganizationComponent.prototype.ngOnInit = function () {
    };
    return OrganizationComponent;
}());
OrganizationComponent = __decorate([
    core_1.Component({
        selector: 'organization',
        templateUrl: 'organization.component.html'
    })
], OrganizationComponent);
exports.OrganizationComponent = OrganizationComponent;
