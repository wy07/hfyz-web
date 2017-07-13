"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var InfoListComponent = (function () {
    function InfoListComponent() {
        this.infoCategories = [{
                'label': '发布信息分类',
                'data': 'Documents Folder',
                'expanded': true,
                'expandedIcon': 'fa-minus-square-o',
                'collapsedIcon': 'fa-plus-square-o',
                'children': [{
                        'label': '公告信息',
                        'expandedIcon': 'fa-folder-open',
                        'collapsedIcon': 'fa-minus',
                    },
                    {
                        'label': '通知信息',
                        'expandedIcon': 'fa-folder-open',
                        'collapsedIcon': 'fa-minus'
                    },
                    {
                        'label': '通报信息',
                        'expandedIcon': 'fa-folder-open',
                        'collapsedIcon': 'fa-minus'
                    }, {
                        'label': '政策法规',
                        'expandedIcon': 'fa-folder-open',
                        'collapsedIcon': 'fa-minus'
                    }, {
                        'label': '行业标准',
                        'expandedIcon': 'fa-folder-open',
                        'collapsedIcon': 'fa-minus'
                    }, {
                        'label': '部门规章',
                        'expandedIcon': 'fa-folder-open',
                        'collapsedIcon': 'fa-minus'
                    }
                ]
            }
        ];
    }
    InfoListComponent.prototype.ngOnInit = function () {
    };
    return InfoListComponent;
}());
InfoListComponent = __decorate([
    core_1.Component({
        selector: 'app-info-list',
        templateUrl: './info-list.component.html',
        styleUrls: ['./info-list.component.css']
    })
], InfoListComponent);
exports.InfoListComponent = InfoListComponent;
