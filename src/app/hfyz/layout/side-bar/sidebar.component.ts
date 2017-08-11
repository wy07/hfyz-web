import { LayoutComponent } from './../main-tab/layout.component';
import { ConfigService } from './../../config/config.service';
import { AuthService } from './../../security/auth.service';
import { Component, OnInit, Renderer, ElementRef, Input, Injector } from '@angular/core';
// import { ConfigService } from '../config/config.service';
import { Router } from '@angular/router';
// import { AuthService } from '../security/auth.service';
import { NgRadio } from 'ng-radio';
// import { LayoutComponent } from './layout.component'
@Component({
    selector: 'u-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['../layout.component.css']
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
	/*constructor(private configService: ConfigService) {
        //
    }*/
    constructor(
        private _router: Router
        , private _authService: AuthService
        , private renderer: Renderer
        , private elRef: ElementRef
        , private _configService: ConfigService
        , private radio: NgRadio
        , private inj: Injector) {
        this.layoutComponent = this.inj.get(LayoutComponent);
        radio.on('SIDE_BAR').subscribe((sidebarMenu) => {
            this.sidebarMenu = sidebarMenu
            this.changeContentClass()
        });
    };
    private changeContentClass() {
        const mainContent = this.elRef.nativeElement.parentElement.querySelector('.u-content')
        const footer = this.elRef.nativeElement.parentElement.querySelector('.u-footer')
        if (this.sidebarMenu === undefined) {
            this.renderer.setElementAttribute(mainContent, 'class', 'u-content');
            this.renderer.setElementAttribute(footer, 'class', 'u-footer');
        } else {
            const mainContentClass = mainContent.getAttribute('class');
            this.renderer.setElementAttribute(mainContent, 'class', mainContentClass + ' u-content-sidebar');
            const footerClass = footer.getAttribute('class');
            this.renderer.setElementAttribute(footer, 'class', footerClass + ' u-footer-active');
        }
    }
    ngOnInit() {
        this.sidebarMenu = this._configService.getConfiguration().SIDE_BAR;
        this.changeContentClass();

    }
    addTab(menu) {
        this.layoutComponent.addTab(menu);
    }
    showContent(event: any, menu) {
        event.preventDefault()
        const element = this.elRef.nativeElement.querySelector('.active-item')
        if (element != null) {
            this.renderer.setElementAttribute(element, 'class', '');
        }
        const oldClasses = event.target.parentNode.parentNode.getAttribute('class');
        this.contentLabel = menu.name
        this.childrenMenuCode = menu.code
        switch (oldClasses) {
            case '':
                this.renderer.setElementAttribute(event.target.parentNode.parentNode, 'class', 'active-item');
                break;
            case 'active-item':
                this.renderer.setElementAttribute(event.target.parentNode.parentNode, 'class', '');
                break;
        }
        let showChildrenMenuCode: string
        const showMainIconMenuCode = event.target.parentNode.parentNode.getAttribute('id')
        const tabmenuContents = this.elRef.nativeElement.querySelector('.layout-tabmenu-contents')
        const tabmenuContentsOldClasses = tabmenuContents.getAttribute('class');
        const mainContent = this.elRef.nativeElement.parentElement.querySelector('.u-content')
        const mainContentClass = mainContent.getAttribute('class');

        if (this.elRef.nativeElement.querySelector('.tabmenu-contents-active')) {
            if (this.elRef.nativeElement.querySelector('.tabmenu-contents-active').hasChildNodes()) {
                showChildrenMenuCode = this.elRef.nativeElement.querySelector('.layout-tabmenu-content').getAttribute('id')
            }
        }
        // 未显示子菜单
        if (menu.children !== undefined && tabmenuContentsOldClasses.indexOf('tabmenu-contents-active') === -1) {
            this.renderer.setElementAttribute(tabmenuContents, 'class', tabmenuContentsOldClasses + ' tabmenu-contents-active');
            this.renderer.setElementAttribute(mainContent, 'class', mainContentClass + ' u-content-active');
        }

        if (showMainIconMenuCode === showChildrenMenuCode) {
            this.renderer.setElementAttribute(tabmenuContents, 'class', ' layout-tabmenu-contents');
            this.renderer.setElementAttribute(mainContent, 'class', 'u-content  u-content-sidebar');
        }
        this.menuChildren = menu.children;
        const mapFoot = document.getElementById('mapFooter');
        if (mapFoot !== null) {
            document.getElementById('mapFooter').setAttribute('class', 'map-footer');
        }
    }
    hideContent(event) {
        console.log('hideContent')
        this.radio.cast('realTime:open2', '33333');
        const tabmenuContents = this.elRef.nativeElement.querySelector('.layout-tabmenu-contents');
        this.renderer.setElementAttribute(tabmenuContents, 'class', 'layout-tabmenu-contents');
        const mainContent = this.elRef.nativeElement.parentElement.querySelector('.u-content');
        this.renderer.setElementAttribute(mainContent, 'class', 'u-content   u-content-sidebar');
        document.getElementById('mapFooter').setAttribute('class', 'map-left');
    }

}
