import {Component, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {OrganizationService} from './shared/org.service';
import {TdLoadingService} from "@covalent/core";
@Component({
    selector: 'organization',
    templateUrl: 'organization.component.html'
})

export class OrganizationComponent implements OnInit {

    orgList: TreeNode[];

    constructor(private _orgService: OrganizationService
        , private _loadingService: TdLoadingService) {

    }

    ngOnInit() {
        this.initData();
    }

    initData() {
        this._loadingService.register();
        this._orgService.list().subscribe(
            res => {
                this._loadingService.resolve();
                this.orgList = res.orgList;
            }
        );
    }

    loadNode(event) {
        if (event.node && !event.node.children) {
            this._orgService.list().subscribe(
                res => {
                    event.node.children = res.orgList;
                }
            );

        }
    }
}
