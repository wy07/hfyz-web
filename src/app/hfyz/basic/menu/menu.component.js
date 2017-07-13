"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var MenuComponent = (function () {
    function MenuComponent(renderer, router, activatedRoute, toastr, menuService, regularService, inj) {
        this.renderer = renderer;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.toastr = toastr;
        this.menuService = menuService;
        this.regularService = regularService;
        this.inj = inj;
        // this.layoutComponent = this.inj.get(LayoutComponent);
        this.displayDialog = false;
        this.menuPositions = [];
        this.menuPositions.push({ label: 'TOP_BAR', value: 'TOP_BAR' });
        this.menuPositions.push({ label: 'SIDE_BAR', value: 'SIDE_BAR' });
        this.clearForm();
    }
    MenuComponent.prototype.ngOnInit = function () {
        this.loadRoot();
    };
    MenuComponent.prototype.loadRoot = function () {
        var _this = this;
        this.menuService.list(null).subscribe(function (res) {
            _this.menuTree = res.menuList;
            _this.type = res.type;
        });
    };
    MenuComponent.prototype.loadNode = function (event) {
        if (event.node && !event.node.children) {
            this.menuService.list(event.node.data.id).subscribe(function (res) {
                event.node.children = res.menuList;
            });
        }
    };
    MenuComponent.prototype.onEdit = function (id) {
        this.clearForm();
        this.formTitle = "\u7F16\u8F91\u83DC\u5355";
        this.isAdd = false;
        this.displayDialog = true;
        this.preEdit(id);
    };
    MenuComponent.prototype.preEdit = function (id) {
        var _this = this;
        this.menuService.edit(id).subscribe(function (res) {
            if (res.result == 'success') {
                console.log(JSON.stringify(res.menu));
                _this.menu = res.menu;
                if (res.parent) {
                    _this.parent = res.parent;
                }
            }
            else {
                _this.toastr.error('获取数据失败');
            }
        });
    };
    MenuComponent.prototype.onCreate = function () {
        this.formTitle = "\u65B0\u589E\u83DC\u5355";
        this.isAdd = true;
        this.displayDialog = true;
        this.clearForm();
    };
    MenuComponent.prototype.onDelete = function (node) {
        var _this = this;
        if (confirm('确认移除该数据？')) {
            this.menuService.delete(node.data.id).subscribe(function (res) {
                if (!node.parent) {
                    _this.menuTree = _this.menuTree.filter(function (n) { return n.data !== node.data; });
                }
                else {
                    node.parent.children = node.parent.children.filter(function (n) { return n.data !== node.data; });
                }
                _this.toastr.info("\u79FB\u9664\u6570\u636E\u6210\u529F");
            });
        }
    };
    MenuComponent.prototype.filteredParent = function (event) {
        var _this = this;
        var query = event.query.trim();
        if (this.regularService.isBlank(query)) {
            return false;
        }
        this.menuService.search(this.menu.position, query).subscribe(function (res) {
            _this.filteredParents = res.menuList;
            for (var _i = 0, _a = _this.filteredParents; _i < _a.length; _i++) {
                var item = _a[_i];
            }
        });
    };
    MenuComponent.prototype.cancle = function () {
        this.displayDialog = false;
    };
    MenuComponent.prototype.save = function () {
        var _this = this;
        if (this.parent) {
            this.menu['parentId'] = this.parent.id;
        }
        if (this.validate()) {
            this.menuService.save(this.menu).subscribe(function (res) {
                _this.toastr.success('保存成功');
                _this.loadRoot();
                _this.displayDialog = false;
            });
        }
    };
    MenuComponent.prototype.update = function () {
        var _this = this;
        if (this.parent) {
            this.menu['parentId'] = this.parent.id;
        }
        if (this.validate()) {
            this.menuService.update(this.menu.id, this.menu).subscribe(function (res) {
                _this.toastr.success('保存成功');
                _this.loadRoot();
                _this.displayDialog = false;
            });
        }
    };
    MenuComponent.prototype.clearForm = function () {
        this.menu = { display: true, position: 'SIDE_BAR' };
        this.filteredParents = [];
        this.parent = null;
    };
    MenuComponent.prototype.validate = function () {
        if (this.regularService.isBlank(this.menu.position)) {
            this.toastr.error('请选择菜单位置');
            return false;
        }
        // if (this.regularService.isBlank(this.menu.name)) {
        //     this.toastr.error('名称不能为空');
        //     return false;
        // }
        if (this.regularService.isBlank(this.menu.code)) {
            this.toastr.error('编码不能为空');
            return false;
        }
        return true;
    };
    return MenuComponent;
}());
MenuComponent = __decorate([
    core_1.Component({
        selector: 'menu',
        templateUrl: 'menu.component.html',
        styleUrls: ['menu.component.css']
    })
], MenuComponent);
exports.MenuComponent = MenuComponent;
