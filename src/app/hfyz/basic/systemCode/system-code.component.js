"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var system_code_type_1 = require("./shared/system-code-type");
var core_1 = require("@angular/core");
var SystemCodeComponent = (function () {
    function SystemCodeComponent(renderer, router, activatedRoute, systemCodeService, toastr, regularService, _configService, inj) {
        this.renderer = renderer;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.systemCodeService = systemCodeService;
        this.toastr = toastr;
        this.regularService = regularService;
        this._configService = _configService;
        this.inj = inj;
        this.displayDialog = false;
        this.systemCode = {};
    }
    SystemCodeComponent.prototype.ngOnInit = function () {
        // this.activatedRoute.params.subscribe(params => {
        //   this.type = this.type = this.inj.get('type');//params['type'];
        // });
        this.initData();
    };
    SystemCodeComponent.prototype.initData = function () {
        var _this = this;
        this.systemCodeService.index().subscribe(function (res) {
            _this.formatSystemCodeTypes(res.systemCodeTypes);
            _this.type = res.type;
            _this.systemCodeTree = res.systemCodeList;
        });
    };
    SystemCodeComponent.prototype.reload = function () {
        var _this = this;
        this.systemCodeService.list(null, this.type).subscribe(function (res) {
            _this.systemCodeTree = res.systemCodeList;
        });
    };
    SystemCodeComponent.prototype.formatSystemCodeTypes = function (types) {
        console.log(JSON.stringify(types));
        this.systemCodeTypes = [];
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var type = types_1[_i];
            this.systemCodeTypes.push({ label: system_code_type_1.SYSTEM_CODE_TYPES[type], value: type });
        }
        console.log(JSON.stringify(this.systemCodeTypes));
    };
    SystemCodeComponent.prototype.loadNode = function (event) {
        if (event.node && !event.node.children) {
            this.systemCodeService.list(event.node.data.id, this.type).subscribe(function (res) {
                event.node.children = res.systemCodeList;
            });
        }
    };
    SystemCodeComponent.prototype.onEdit = function (id) {
        this.clearForm();
        this.formTitle = "\u7F16\u8F91 " + system_code_type_1.SYSTEM_CODE_TYPES[this.type];
        this.isAdd = false;
        this.displayDialog = true;
        this.preEdit(id);
    };
    SystemCodeComponent.prototype.preEdit = function (id) {
        var _this = this;
        this.systemCodeService.edit(id, this.type).subscribe(function (res) {
            if (res.result == 'success') {
                _this.systemCode = res.systemCode;
                if (res.parent) {
                    _this.parent = res.parent;
                    _this.parent.info = res.parent.codeNum + "\uFF08" + res.parent.name + "\uFF09";
                }
            }
            else {
                _this.toastr.error('获取数据失败');
            }
        });
    };
    // onActive() {
    //   this._configService.load()
    // }
    SystemCodeComponent.prototype.onCreate = function () {
        this.formTitle = "\u65B0\u589E " + system_code_type_1.SYSTEM_CODE_TYPES[this.type];
        this.isAdd = true;
        this.displayDialog = true;
        this.clearForm();
    };
    SystemCodeComponent.prototype.onDelete = function (node) {
        var _this = this;
        if (confirm('确认移除该数据？')) {
            this.systemCodeService.delete(node.data.id, this.type).subscribe(function (res) {
                if (!node.parent) {
                    _this.systemCodeTree = _this.systemCodeTree.filter(function (n) { return n.data !== node.data; });
                }
                else {
                    node.parent.children = node.parent.children.filter(function (n) { return n.data !== node.data; });
                }
                _this.toastr.info("\u79FB\u9664\u6570\u636E\u6210\u529F");
            });
        }
    };
    SystemCodeComponent.prototype.filteredParent = function (event) {
        var _this = this;
        var query = event.query.trim();
        if (this.regularService.isBlank(query)) {
            return false;
        }
        this.systemCodeService.search(query, this.type).subscribe(function (res) {
            _this.filteredParents = res.systemCodeList.filter(function (n) { return n.id !== _this.systemCode.id; });
            for (var _i = 0, _a = _this.filteredParents; _i < _a.length; _i++) {
                var item = _a[_i];
                item.info = item.codeNum + "\uFF08" + item.name + "\uFF09";
            }
        });
    };
    SystemCodeComponent.prototype.cancle = function () {
        this.displayDialog = false;
    };
    SystemCodeComponent.prototype.save = function () {
        var _this = this;
        if (this.parent) {
            this.systemCode['parentId'] = this.parent.id;
        }
        if (this.validate()) {
            this.systemCodeService.save(this.systemCode, this.type).subscribe(function (res) {
                _this.toastr.success('保存成功');
                _this.reload();
                _this.displayDialog = false;
            });
        }
    };
    SystemCodeComponent.prototype.update = function () {
        var _this = this;
        if (this.parent) {
            this.systemCode['parentId'] = this.parent.id;
        }
        if (this.validate()) {
            this.systemCodeService.update(this.systemCode.id, this.systemCode, this.type).subscribe(function (res) {
                _this.toastr.success('保存成功');
                _this.reload();
                _this.displayDialog = false;
            });
        }
    };
    SystemCodeComponent.prototype.validate = function () {
        if (this.regularService.isBlank(this.systemCode.name)) {
            this.toastr.error('名称不能为空');
            return false;
        }
        if (this.regularService.isBlank(this.systemCode.codeNum)) {
            this.toastr.error('编码不能为空');
            return false;
        }
        return true;
    };
    SystemCodeComponent.prototype.clearForm = function () {
        this.systemCode = {};
        this.filteredParents = [];
        this.parent = null;
    };
    return SystemCodeComponent;
}());
SystemCodeComponent = __decorate([
    core_1.Component({
        selector: 'system-code',
        templateUrl: 'system-code.component.html',
        styleUrls: ['system-code.component.css']
    })
], SystemCodeComponent);
exports.SystemCodeComponent = SystemCodeComponent;
