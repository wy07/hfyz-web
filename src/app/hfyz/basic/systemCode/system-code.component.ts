import {SYSTEM_CODE_TYPES} from './shared/system-code-type';
import {SystemCodeService} from './shared/system-code.service';
import {RegularService} from '../../common/shared/regular.service';
import {Component, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/components/common/api';
import {ToastsManager} from 'ng2-toastr';
import {TdLoadingService} from "@covalent/core";
@Component({
    selector: 'system-code',
    templateUrl: 'system-code.component.html',
    styleUrls: ['system-code.component.css']
})

export class SystemCodeComponent implements OnInit {

    systemCodeTree: TreeNode[];
    type: string;
    displayDialog: boolean;

    formTitle: string;
    isAdd: boolean;
    systemCode: any;

    systemCodeTypes: any[];

    filteredParents: any[];
    parent: any;


    constructor(private systemCodeService: SystemCodeService
        , private toastr: ToastsManager
        , private regularService: RegularService
        , private _loadingService: TdLoadingService) {
        this.displayDialog = false;
        this.systemCode = {};
    }

    ngOnInit() {
        this.initData();
    }

    initData() {
        this._loadingService.register();
        this.systemCodeService.index().subscribe(
            res => {
                this._loadingService.resolve();
                this.formatSystemCodeTypes(res.systemCodeTypes);
                this.type = res.type;
                this.systemCodeTree = res.systemCodeList;
            }
        );
    }

    reload() {
        this.systemCodeService.list(null, this.type).subscribe(
            res => {
                this.systemCodeTree = res.systemCodeList;
            }
        );
    }

    formatSystemCodeTypes(types) {
        this.systemCodeTypes = [];
        for (const type of types) {
            this.systemCodeTypes.push({label: SYSTEM_CODE_TYPES[type], value: type});
        }
    }


    loadNode(event) {
        if (event.node && !event.node.children) {
            this.systemCodeService.list(event.node.data.id, this.type).subscribe(
                res => {
                    event.node.children = res.systemCodeList;
                }
            );
        }
    }

    onEdit(id) {
        this.clearForm();
        this.formTitle = `编辑`;
        this.isAdd = false;
        this.displayDialog = true;
        this.preEdit(id);
    }

    preEdit(id: number) {
        this.systemCodeService.edit(id, this.type).subscribe(
            res => {
                if (res.result === 'success') {
                    this.systemCode = res.systemCode;
                    if (res.parent) {
                        this.parent = res.parent;
                        this.parent.info = `${res.parent.codeNum}（${res.parent.name}）`;
                    }
                } else {
                    this.toastr.error('获取数据失败');
                }
            }
        );
    }

    onCreate() {
        this.formTitle = `新增`;
        this.isAdd = true;
        this.displayDialog = true;
        this.clearForm();
    }

    onDelete(node: TreeNode) {
        if (confirm('确认移除该数据？')) {
            this.systemCodeService.delete(node.data.id, this.type).subscribe(
                res => {
                    if (!node.parent) {
                        this.systemCodeTree = this.systemCodeTree.filter(n => n.data !== node.data);
                    } else {
                        node.parent.children = node.parent.children.filter(n => n.data !== node.data);
                    }
                    this.toastr.info(`移除数据成功`);
                }
            );
        }
    }

    filteredParent(event) {
        const query = event.query.trim();
        if (this.regularService.isBlank(query)) {
            return false;
        }
        this.systemCodeService.search(query, this.type).subscribe(
            res => {
                this.filteredParents = res.systemCodeList.filter(n => n.id !== this.systemCode.id);
                for (const item of this.filteredParents) {
                    item.info = `${item.codeNum}（${item.name}）`;
                }
            }
        );
    }

    cancle() {
        this.displayDialog = false;
    }

    save() {
        if (this.parent) {
            this.systemCode['parentId'] = this.parent.id;
        }
        if (this.validate()) {
            this.systemCodeService.save(this.systemCode, this.type).subscribe(
                res => {
                    this.toastr.success('保存成功');
                    this.reload();
                    this.displayDialog = false;
                }
            );
        }
    }

    update() {
        if (this.parent) {
            this.systemCode['parentId'] = this.parent.id;
        }
        if (this.validate()) {
            this.systemCodeService.update(this.systemCode.id, this.systemCode, this.type).subscribe(
                res => {
                    this.toastr.success('保存成功');
                    this.reload();
                    this.displayDialog = false;
                }
            );
        }
    }

    validate() {
        if (this.regularService.isBlank(this.systemCode.name)) {
            this.toastr.error('名称不能为空');
            return false;
        }

        if (this.regularService.isBlank(this.systemCode.codeNum)) {
            this.toastr.error('编码不能为空');
            return false;
        }

        return true;
    }

    clearForm() {
        this.systemCode = {};
        this.filteredParents = [];
        this.parent = null;
    }

}
