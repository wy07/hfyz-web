"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var dynamic_component_1 = require("./../../common/dynamic/dynamic.component");
var core_1 = require("@angular/core");
var primeng_1 = require("primeng/primeng");
var LayoutComponent = (function () {
    function LayoutComponent(mapService) {
        this.mapService = mapService;
        // {header: '首页', selected : true, closable : false,icon:'fa-home',index:0,code:'admin',lazy:false}
        this.defaultTab = {
            header: '首页',
            selected: true,
            closable: false,
            disabled: false,
            icon: 'fa-home',
            index: 0,
            code: 'home',
            inputs: {},
            hasMap: false,
            initMap: false
        };
        this.tabs = [{
                header: '首页',
                selected: true,
                closable: false,
                disabled: false,
                icon: 'fa-home',
                index: 0,
                code: 'home',
                inputs: {},
                hasMap: false,
                initMap: false
            }];
        this.initMap = false;
    }
    ;
    LayoutComponent.prototype.ngOnInit = function () {
        this.handleChange(0);
    };
    LayoutComponent.prototype.onCloseTab = function (event) {
        var currentTab = this.tabs[event.index];
        if (!currentTab.initMap) {
            console.log("======aaaa init");
            this.tabs.splice(event.index, 1);
            event.close();
        }
        else {
            this.tabs[event.index].disabled = true;
            this.tabroot.activeIndex = 0;
        }
    };
    LayoutComponent.prototype.addTab = function (menu) {
        var mapMenus = ['realTimeMap', 'historyMap', 'otherMap'];
        console.log("aaaa=" + (mapMenus.find(function (x) { return x === menu.code; }) === undefined));
        this.initMap = false;
        if (mapMenus.find(function (x) { return x === menu.code; }) === undefined) {
            console.log("=====1");
            this.activeTab(menu);
        }
        else {
            console.log('1');
            this.mapService.change.emit("" + menu.code);
            //如果没有地图，加载地图模板
            if (this.tabs.find(function (x) { return x.initMap === true; }) === undefined) {
                this.initMap = true;
                this.initMapTab(menu);
                return;
            }
            console.log('2');
            var mapTab_1 = this.tabs.find(function (x) { return x.hasMap === true && x.initMap === true; });
            var mapTabIndex = this.tabs.findIndex(function (x) { return x.hasMap === true && x.initMap === true; });
            var oldMapTabIndex = this.tabs.findIndex(function (x) { return x.code === mapTab_1.code; });
            var currentTab_1 = this.tabs.find(function (x) { return x.code === menu.code; });
            console.log('3');
            //如果有地图，当前component未加载,新加tab并交换位置
            if (currentTab_1 === undefined) {
                console.log('4');
                console.log("currentTab === undefined");
                var newTab = {
                    header: mapTab_1.header //menu.name
                    ,
                    icon: mapTab_1.icon,
                    selected: false,
                    closable: true,
                    disabled: false,
                    index: oldMapTabIndex + 1,
                    code: mapTab_1.code,
                    inputs: { code: mapTab_1.code },
                    hasMap: true,
                    initMap: false
                };
                mapTab_1.header = menu.name;
                mapTab_1.icon = menu.icon;
                mapTab_1.selected = menu.true;
                mapTab_1.code = menu.icon;
                mapTab_1.index = this.tabs.length;
                mapTab_1.code = menu.code;
                mapTab_1.inputs = { code: menu.code };
                this.tabs.push(newTab);
                this.tabs[oldMapTabIndex] = newTab;
                console.log("mapTab.disabled:" + mapTab_1.disabled);
                if (mapTab_1.disabled) {
                    this.tabs.splice(oldMapTabIndex, 1);
                    mapTab_1.disabled = false;
                }
                this.tabs[this.tabs.length - 1] = mapTab_1;
                console.log("CODE:" + this.tabs[this.tabs.length - 1].code + "====this.tabs.length:" + this.tabs.length);
                this.tabroot.activeIndex = this.tabs.length - 1;
            }
            else if (mapTab_1.code == currentTab_1.code) {
                console.log('5');
                console.log("mapTab.code == currentTab.code");
                if (mapTab_1.disabled) {
                    mapTab_1.disabled = false;
                    mapTab_1.index = this.tabs.length;
                    this.tabs.push(mapTab_1);
                    this.tabs.splice(mapTabIndex, 1);
                    this.tabroot.activeIndex = this.tabs.length - 1;
                }
            }
            else {
                console.log('6');
                console.log("mapTab.code != currentTab.code");
                var currentMapTabIndex = this.tabs.findIndex(function (x) { return x.code === currentTab_1.code; });
                var tempTab = {
                    header: mapTab_1.header //menu.name
                    ,
                    icon: mapTab_1.icon,
                    selected: false,
                    disabled: false,
                    closable: true,
                    index: oldMapTabIndex + 1,
                    code: mapTab_1.code,
                    inputs: { code: mapTab_1.code },
                    hasMap: true,
                    initMap: false
                };
                mapTab_1.header = menu.name;
                mapTab_1.icon = menu.icon;
                mapTab_1.selected = true;
                mapTab_1.code = menu.icon;
                mapTab_1.index = this.tabs.length;
                mapTab_1.code = menu.code;
                mapTab_1.inputs = { code: menu.code };
                this.tabs[oldMapTabIndex] = tempTab;
                this.tabs[currentMapTabIndex] = mapTab_1;
                this.tabroot.activeIndex = currentMapTabIndex;
            }
        }
        console.log("========tabs:");
        console.log(JSON.stringify(this.tabs));
    };
    LayoutComponent.prototype.initMapTab = function (menu) {
        var index = this.tabs.length;
        this.tabs.push({
            header: menu.name,
            icon: menu.icon,
            selected: true,
            closable: true,
            disabled: false,
            index: index,
            code: menu.code,
            inputs: { code: menu.code },
            hasMap: true,
            initMap: true
        });
        this.tabroot.activeIndex = index;
    };
    LayoutComponent.prototype.activeTab = function (menu) {
        var tab = this.tabs.find(function (x) { return x.header === menu.name; });
        var index = 0;
        if (tab === undefined) {
            var inputs = null;
            if (menu.parameter !== undefined) {
                inputs = menu.parameter;
            }
            index = this.tabs.length;
            this.tabs.push({
                header: menu.name,
                icon: menu.icon,
                selected: true,
                closable: true,
                disabled: false,
                index: index,
                code: menu.code,
                inputs: JSON.parse(inputs),
                hasMap: false,
                initMap: false
            });
        }
        else {
            index = tab.index;
        }
        this.tabroot.activeIndex = index;
    };
    LayoutComponent.prototype.getComponentName = function (tab) {
        // console.log(`getComponentName1:${tab.hasMap}==${!tab.initMap}`)
        if (tab.hasMap && !tab.initMap) {
            return 'nullMap';
        }
        else {
            return tab.code;
        }
    };
    LayoutComponent.prototype.closeAll = function () {
        this.tabs = [];
        this.tabs.push(this.defaultTab);
        this.tabroot.activeIndex = 0;
    };
    LayoutComponent.prototype.handleChange = function (event) {
        console.log("in handleChange" + event.index);
        if (event.index === undefined) {
            return;
        }
        var currentTab = this.tabs[event.index];
        if (currentTab === undefined || !currentTab.hasMap) {
            return;
        }
        var mapTab = this.tabs.find(function (x) { return x.hasMap === true && x.initMap === true; });
        var oldMapTabIndex = this.tabs.findIndex(function (x) { return x.hasMap === true && x.initMap === true; });
        this.mapService.change.emit("" + currentTab.code);
        var tempTab = {
            header: mapTab.header //menu.name
            ,
            icon: mapTab.icon,
            selected: false,
            disabled: false,
            closable: true,
            index: oldMapTabIndex + 1,
            code: mapTab.code,
            inputs: { code: mapTab.code },
            hasMap: true,
            initMap: false
        };
        mapTab.header = currentTab.header;
        mapTab.icon = currentTab.icon;
        mapTab.selected = true;
        mapTab.code = currentTab.icon;
        mapTab.index = currentTab.index;
        mapTab.code = currentTab.code;
        mapTab.inputs = currentTab.inputs;
        console.log("oldMapTabIndex:" + oldMapTabIndex + ",event.index:" + event.index);
        this.tabs[oldMapTabIndex] = tempTab;
        this.tabs[event.index] = mapTab;
        this.tabroot.activeIndex = event.index;
    };
    return LayoutComponent;
}());
__decorate([
    core_1.Input()
], LayoutComponent.prototype, "panelTitle", void 0);
__decorate([
    core_1.Input()
], LayoutComponent.prototype, "activeMenu", void 0);
__decorate([
    core_1.ViewChild(primeng_1.TabView)
], LayoutComponent.prototype, "tabroot", void 0);
__decorate([
    core_1.ViewChildren(dynamic_component_1.DynamicComponent)
], LayoutComponent.prototype, "dynamicContainers", void 0);
LayoutComponent = __decorate([
    core_1.Component({
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        selector: 'u-layout',
        templateUrl: 'layout.component.html',
        styleUrls: ['../layout.component.css']
    })
], LayoutComponent);
exports.LayoutComponent = LayoutComponent;
