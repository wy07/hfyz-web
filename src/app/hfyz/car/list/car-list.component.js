"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var layout_component_1 = require("../../layout/main-tab/layout.component");
var CarListComponent = (function () {
    function CarListComponent(toastr, regularService, carService, inj) {
        this.toastr = toastr;
        this.regularService = regularService;
        this.carService = carService;
        this.inj = inj;
        this.max = 10;
        this.currentPage = 0;
        this.totalCars = 0;
        this.cars = [];
        this.licenseNo = '';
        this.businessTypes = [{ label: '班线客车', value: '班线客车' }, { label: '旅游包车', value: '旅游包车' }, { label: '危险品运输车', value: '危险品运输车' }];
        this.businessType = this.businessTypes[0].value;
        this.layoutComponent = this.inj.get(layout_component_1.LayoutComponent);
    }
    CarListComponent.prototype.ngOnInit = function () {
        this.loadDate();
    };
    CarListComponent.prototype.search = function () {
        this.loadDate();
    };
    CarListComponent.prototype.loadDate = function (offset) {
        var _this = this;
        if (offset === void 0) { offset = 0; }
        if (this.regularService.isBlank(this.businessType)) {
            this.toastr.error('请选择行业类别');
            return false;
        }
        this.carService.search(this.businessType, this.licenseNo, this.max, offset).subscribe(function (res) {
            _this.cars = res.carList;
            _this.totalCars = res.carCount;
        });
    };
    CarListComponent.prototype.paginate = function (event) {
        if (this.currentPage != event.page) {
            this.currentPage = event.page;
            this.loadDate(this.max * event.page);
        }
    };
    CarListComponent.prototype.showRealTimeMap = function (item) {
        var menu = { name: '实时数据', icon: 'fa-map', code: 'realTimeMap', inputs: { frameNo: item.frameNo, id: item.frameNo } };
        this.layoutComponent.addTab(menu);
    };
    CarListComponent.prototype.showHistoryMapp = function (item) {
        var menu = { name: '历史数据', icon: 'fa-map', code: 'historyMap', inputs: { frameNo: item.frameNo, id: item.frameNo } };
        this.layoutComponent.addTab(menu);
    };
    return CarListComponent;
}());
CarListComponent = __decorate([
    core_1.Component({
        selector: 'car-list',
        templateUrl: 'car-list.component.html'
    })
], CarListComponent);
exports.CarListComponent = CarListComponent;
