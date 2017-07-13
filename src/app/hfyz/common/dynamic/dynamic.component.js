"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var components_1 = require("./components");
// import { MenuListComponent } from './../../menu/list/menu-list.component';
var DynamicComponent = (function () {
    /*_inited: boolean
     set inited(val: boolean) {
     if(val) {
     this.loadComponent();
     }
     this._inited = val;
     };
  
     get inited() {
     return this._inited;
     }*/
    function DynamicComponent(resolver, initStatus, appRef, mapService) {
        this.resolver = resolver;
        this.initStatus = initStatus;
        this.appRef = appRef;
        this.mapService = mapService;
        //this.loadComponent()
    }
    DynamicComponent.prototype.ngOnInit = function () {
        // console.log(`ngOnInit:${JSON.stringify(this.inputs)}`)
        console.log("ngOnInit:" + this.componentName);
    };
    DynamicComponent.prototype.getaComponentName = function () {
        if (this.tab.hasMap && !this.tab.initMap) {
            return 'nullMap';
        }
        else {
            return this.tab.code;
        }
    };
    DynamicComponent.prototype.loadComponent = function () {
        console.log("======loadComponent:");
        var factory = this.resolver.resolveComponentFactory(components_1.components[this.getaComponentName()]);
        /*if(!this.inputs)
         this.inputs={}
    
         let inputProviders = Object.keys(this.inputs).map((inputName) => {
         console.log(inputName)
         return {provide: inputName, useValue: this.inputs[inputName]};});
    
         let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
    
         let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.container.parentInjector);
         let component = factory.create(injector);
    
         this.container.insert(component.hostView);
         if (this.compRef) {
         this.compRef.destroy();
         }*/
        var component = this.container.createComponent(factory);
        /*this.initStatus.donePromise.then(() => {
         component =this.container.createComponent(factory);
         this.appRef.registerChangeDetector(component.changeDetectorRef);
         this.appRef.tick();
         });*/
        // detectChanges
        if (this.componentName != 'nullMap') {
            setInterval(function () {
                component.changeDetectorRef.markForCheck();
            }, 50);
        }
        this.loaded = true;
        this.compRef = component;
        if (this.initMap) {
            this.mapService.change.emit("" + this.inputs.code);
        }
    };
    DynamicComponent.prototype.ngAfterContentInit = function () {
        this.loadComponent();
    };
    DynamicComponent.prototype.ngOnDestroy = function () {
        console.log("======" + this.componentName + "=====ngOnDestroy=============");
        if (this.compRef) {
            this.compRef.destroy();
        }
    };
    return DynamicComponent;
}());
__decorate([
    core_1.ViewChild('container', { read: core_1.ViewContainerRef })
], DynamicComponent.prototype, "container", void 0);
__decorate([
    core_1.Input()
], DynamicComponent.prototype, "componentName", void 0);
__decorate([
    core_1.Input()
], DynamicComponent.prototype, "inputs", void 0);
__decorate([
    core_1.Input()
], DynamicComponent.prototype, "tab", void 0);
__decorate([
    core_1.Input()
], DynamicComponent.prototype, "initMap", void 0);
DynamicComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-container',
        entryComponents: Object.keys(components_1.components).map(function (key) { return components_1.components[key]; }),
        template: "\n    <ng-template #container></ng-template>\n    <div *ngIf=\"!loaded\" class=\"loader\"></div>\n  ",
        styles: ["\n    .loader {\n      position: relative;\n      min-height: 100px;\n    }\n\n    .loader:after {\n      content: '\u5185\u5BB9\u52A0\u8F7D\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85...';\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n  "]
    })
], DynamicComponent);
exports.DynamicComponent = DynamicComponent;
