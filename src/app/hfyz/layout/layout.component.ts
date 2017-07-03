import { Component, OnInit,Input,ViewChild ,ViewChildren,ChangeDetectionStrategy,QueryList,Renderer, ElementRef } from '@angular/core';
import {TabViewModule,TabView,TabPanel} from 'primeng/primeng';

import { DynamicComponent }  from './../common/dynamic/dynamic.component';
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'u-layout',
	templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.css']
})

export class LayoutComponent implements OnInit {
	@Input()  panelTitle: string;
	@Input()  activeMenu: string;
	@ViewChild(TabView) tabroot: TabView;
	@ViewChildren(DynamicComponent) dynamicContainers: QueryList<DynamicComponent>;
  public defaultTab={header: '首页', selected : true, closable : false,icon:'fa-home',index:0,code:'home', inputs:{}}//{header: '首页', selected : true, closable : false,icon:'fa-home',index:0,code:'admin',lazy:false}
	public tabs=[{header: '首页', selected : true, closable : false,icon:'fa-home',index:0,code:'home', inputs:{}}];
	ngOnInit() { 
		this.handleChange(0)
	}
	onCloseTab(event){
		this.tabs.splice(event.index,1)
		event.close()
	}
	public addTab(menu){
		let tab=this.tabs.find(x => x.header == menu.name)
		console.log(menu.parameter)
		let index = 0
		if(tab===undefined){
			let inputs=null
			if(menu.parameter!==undefined){
				inputs = menu.parameter
			}
			index=this.tabs.length
			this.tabs.push({header: menu.name
					,icon:menu.icon
					, selected : true
					, closable : true
					,index:index
					,code:menu.code
					,inputs:JSON.parse(inputs)})
		}else{
			index = tab.index
		}
		this.tabroot.activeIndex=index
		//this.handleChange(index)
	}
	public closeAll(){
		this.tabs=[]
		this.tabs.push(this.defaultTab)
		this.tabroot.activeIndex=0
	}
	handleChange(index){
		/*console.log(index)
		console.log(this.dynamicContainers)
		if(this.dynamicContainers){
			console.log(this.dynamicContainers.length)
			let dynamicContainer = this.dynamicContainers.toArray()[index];
    	if (!dynamicContainer || dynamicContainer.inited) return;
			dynamicContainer.inited = true;
		}*/
		
		
	}
}