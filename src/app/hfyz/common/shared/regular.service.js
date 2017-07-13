"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var RegularService = (function () {
    function RegularService() {
        this.Int_regular = /^[0-9]*$/;
        this.Float_regular = /^[0-9.]*$/;
        this.Sn_regular = /^[0-9a-zA-Z\W]+$/;
        this.Strong_regular = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
    }
    ;
    RegularService.prototype.isInt = function (value) {
        return this.Int_regular.test(value);
    };
    RegularService.prototype.isFloat = function (value) {
        return this.Float_regular.test(value);
    };
    RegularService.prototype.isBlank = function (value) {
        if (value === null || value === '') {
            return true;
        }
        return false;
    };
    RegularService.prototype.isSn = function (value) {
        return this.Sn_regular.test(value);
    };
    RegularService.prototype.isStrong = function (value) {
        return this.Strong_regular.test(value);
    };
    return RegularService;
}());
RegularService = __decorate([
    core_1.Injectable()
], RegularService);
exports.RegularService = RegularService;
