"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ConfigService = (function () {
    function ConfigService(_restangular, _radio, _authService) {
        this._restangular = _restangular;
        this._radio = _radio;
        this._authService = _authService;
    }
    ConfigService.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._restangular.all('systemCode').customGET('getmenu').subscribe(function (config) {
                console.log('######');
                console.log(config);
                _this.config = config;
                _this._radio.cast('TOP_BAR', _this.config.TOP_BAR);
                _this._radio.cast('SIDE_BAR', _this.config.SIDE_BAR);
                resolve();
            });
        });
    };
    ConfigService.prototype.setRoleRights = function (ROLE_RIGHTS) {
        this.config.ROLE_RIGHTS = ROLE_RIGHTS;
    };
    ConfigService.prototype.getConfiguration = function () {
        if (this.config.ROLE_RIGHTS == null) {
            this.config.ROLE_RIGHTS = this._authService.getCurrentUser('roleRights');
        }
        return this.config;
    };
    return ConfigService;
}());
ConfigService = __decorate([
    core_1.Injectable()
], ConfigService);
exports.ConfigService = ConfigService;
;
