"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ChangePwdComponent = (function () {
    function ChangePwdComponent(_toastr, _regular) {
        this._toastr = _toastr;
        this._regular = _regular;
        this.originPwd = '';
        this.newPwd = '';
        this.affirmPwd = '';
    }
    ChangePwdComponent.prototype.validation = function () {
        if (this._regular.isBlank(this.originPwd)) {
            this._toastr.info('请输入旧密码！');
            return false;
        }
        if (this.originPwd === this.newPwd) {
            this._toastr.info('新密码不能与旧密码一致！');
            return false;
        }
        if (this._regular.isBlank(this.newPwd)) {
            this._toastr.info('请输入新密码！');
            return false;
        }
        if (!this._regular.isStrong(this.newPwd)) {
            this._toastr.info('新密码必须只包含数字和字母,并且长度大于6位！');
            return false;
        }
        if (this.newPwd !== this.affirmPwd) {
            this._toastr.info('两次输入的新密码不一致！');
            return false;
        }
        return true;
    };
    ChangePwdComponent.prototype.onSubmit = function () {
        if (this.validation()) {
        }
    };
    return ChangePwdComponent;
}());
ChangePwdComponent = __decorate([
    core_1.Component({
        selector: 'change-pwd',
        templateUrl: 'change-pwd.component.html',
        styleUrls: ['change-pwd.component.css']
    })
], ChangePwdComponent);
exports.ChangePwdComponent = ChangePwdComponent;
