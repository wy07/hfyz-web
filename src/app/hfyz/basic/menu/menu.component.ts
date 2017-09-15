import { MenuService } from './shared/menu.service';
import { Component, OnInit} from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { TreeNode } from 'primeng/components/common/api';
import { RegularService } from '../../common/shared/regular.service';
import {TdLoadingService} from '@covalent/core';
import {CustomDialogService} from '../../common/shared/custom-dialog.service';
@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})

export class MenuComponent implements OnInit {

    menuTree: TreeNode[];
    type: number;
    layoutComponent;

    displayDialog: boolean;
    menuPositions: any[];

    formTitle: string;
    isAdd: boolean;
    menu: any;
    filteredParents: any[];
    parent: any;


    constructor(private toastr: ToastsManager
        , private menuService: MenuService
        , private regularService: RegularService
        , private _loadingService: TdLoadingService
        , private _customDialogService: CustomDialogService) {
        this.displayDialog = false;

        this.menuPositions = [];
        this.menuPositions.push({ label: 'TOP_BAR', value: 'TOP_BAR' });
        this.menuPositions.push({ label: 'SIDE_BAR', value: 'SIDE_BAR' });
        this.clearForm();
    }

    ngOnInit() {
        this.loadRoot();
    }


    loadRoot() {
        this._loadingService.register();
        this.menuService.list(null).subscribe(
            res => {
                this._loadingService.resolve();
                this.menuTree = res.menuList;
                this.type = res.type;
            }
        );
    }

    loadNode(event) {
        if (event.node && !event.node.children) {
            this._loadingService.register();
            this.menuService.list(event.node.data.id).subscribe(
                res => {
                    this._loadingService.resolve();
                    event.node.children = res.menuList;
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

    preEdit(id) {
        this.menuService.edit(id).subscribe(
            res => {
                if (res.result === 'success') {
                    this.menu = res.menu;
                    if (res.parent) {
                        this.parent = res.parent;
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
        const msg = '确认删除菜单为【' + node.data.name + '】的记录吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this.menuService.delete(node.data.id).subscribe(res => {
                    this._loadingService.resolve();
                    if (!node.parent) {
                        this.menuTree = this.menuTree.filter(n => n.data !== node.data);
                    } else {
                        node.parent.children = node.parent.children.filter(n => n.data !== node.data);
                    }
                    this.toastr.info('删除成功');
                })
            }
        })
    }

    filteredParent(event) {
        const query = event.query.trim();
        if (this.regularService.isBlank(query)) {
            return false;
        }
        this.menuService.search(this.menu.position, query).subscribe(
            res => {
                this.filteredParents = res.menuList;
                for (const item of this.filteredParents) {
                    // item.info = `${item.code}（${item.name}）`;
                }
            }
        );
    }

    cancle() {
        this.displayDialog = false;
    }

    save() {
        if (this.parent) {
            this.menu['parentId'] = this.parent.id;
        }
        if (this.validate()) {
            this.menuService.save(this.menu).subscribe(
                res => {
                    this.toastr.success('保存成功');
                    this.loadRoot();
                    this.displayDialog = false;
                }
            );
        }
    }

    update() {
        if (this.parent) {
            this.menu['parentId'] = this.parent.id;
        }
        if (this.validate()) {
            this.menuService.update(this.menu.id, this.menu).subscribe(
                res => {
                    this.toastr.success('保存成功');
                    this.loadRoot();
                    this.displayDialog = false;
                }
            );
        }
    }
    clearForm() {
        this.menu = { display: true, position: 'SIDE_BAR' };
        this.filteredParents = [];
        this.parent = null;
    }

    validate() {
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
    }

}
