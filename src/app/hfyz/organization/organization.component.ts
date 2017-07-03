import { Component,Renderer, OnInit,ViewChild,ElementRef } from '@angular/core';
import {OrganizationChartModule,TreeNode} from 'primeng/primeng';
import { OrganizationService} from './shared/org.service'
@Component({
	selector: 'organization',
	templateUrl: 'organization.component.html'
})

export class OrganizationComponent implements OnInit {
    
	orgList: TreeNode[];
    constructor( private _orgService: OrganizationService,private renderer:Renderer) {
      this.initData();
    }
    initData(){
        this._orgService.list().subscribe(
        res=>{
            console.log(res.orgList)
            this.orgList=[res.orgList];
        }
        );
    }
    
	ngOnInit() { 
		
	}
}