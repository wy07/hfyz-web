"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var InfoCheckComponent = (function () {
    function InfoCheckComponent() {
        this.categories = [{
                'label': '审核信息分类',
                'data': 'Documents Folder',
                'expanded': true,
                'expandedIcon': 'fa-minus-square-o',
                'collapsedIcon': 'fa-plus-square-o',
                'children': [{
                        'label': '待审核',
                        'expandedIcon': 'fa-folder-open',
                        'collapsedIcon': 'fa-minus',
                    },
                    {
                        'label': '已审核',
                        'expandedIcon': 'fa-folder-open',
                        'collapsedIcon': 'fa-minus'
                    },
                    {
                        'label': '不通过',
                        'expandedIcon': 'fa-folder-open',
                        'collapsedIcon': 'fa-minus'
                    }]
            }
        ];
        window.console.log(this.categories);
    }
    InfoCheckComponent.prototype.ngOnInit = function () {
    };
    return InfoCheckComponent;
}());
InfoCheckComponent = __decorate([
    core_1.Component({
        selector: 'app-info-check',
        templateUrl: './info-check.component.html',
        styleUrls: ['./info-check.component.css']
    })
], InfoCheckComponent);
exports.InfoCheckComponent = InfoCheckComponent;
