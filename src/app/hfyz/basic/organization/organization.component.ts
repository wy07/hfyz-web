import { Component, Renderer, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { OrganizationService } from './shared/org.service';
@Component({
  selector: 'organization',
  templateUrl: 'organization.component.html'
})

export class OrganizationComponent implements OnInit {

  orgList: TreeNode[];
  constructor(private _orgService: OrganizationService, private renderer: Renderer) {
    this.initData();
  }
  initData() {
    this._orgService.list().subscribe(
      res => {
        console.log(res.orgList);
        // this.orgList=[res.orgList];
        this.orgList = res.orgList;
      }
    );
  }
  loadNode(event) {
    // alert('dsf');
    if (event.node && !event.node.children) {
      this._orgService.list().subscribe(
        res => {
          event.node.children = res.orgList;
        }
      );

    }
  }
  ngOnInit() {

  }
}
