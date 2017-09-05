import { LayoutComponent } from './../main-tab/layout.component';
import { ConfigService } from './../../config/config.service';
import { Component, OnInit, Renderer, ElementRef, Input, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { NgRadio } from 'ng-radio';
@Component({
    selector: 'u-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SideBarComponent implements OnInit {
    roleRights = []
    sidebarMenu
    appbrand: string
    newitems = []
    contentLabel: string
    childrenMenuCode: string
    menuChildren
    layoutComponent
    @Input() activeMenu: string;

    constructor(
        private _configService: ConfigService
        , private radio: NgRadio
        , private inj: Injector) {
        this.layoutComponent = this.inj.get(LayoutComponent);
        radio.on('SIDE_BAR').subscribe((sidebarMenu) => {
            console.log("!!! SideBarComponent subscribe")
            this.sidebarMenu = sidebarMenu
        });
    };

    ngOnInit() {
        console.log("!!! SideBarComponent SIDE_BAR")        
        this.sidebarMenu = this._configService.getConfiguration().SIDE_BAR;
    }

    addTab(menu) {
        this.layoutComponent.addTab(menu);
    }

    showChildren(event: any, menu) {
        menu.hasChildren = !menu.hasChildren;
    }
}
