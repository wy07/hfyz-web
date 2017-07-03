import { Component, OnInit, Renderer, ElementRef, Input, Injector } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../security/auth.service';
import { NgRadio } from 'ng-radio';
import { LayoutComponent } from './layout.component'
@Component({
	selector: 'u-sidebar',
	templateUrl: 'sidebar.component.html',
	styleUrls: ['layout.component.css']
})

export class SideBarComponent implements OnInit {
	roleRights = []
	sidebarMenu
	appbrand: string
	newitems = []
	contentLabel: string
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
		console.log('%%%%%%%%%')
	};
	private changeContentClass() {
		let mainContent = this.elRef.nativeElement.parentElement.querySelector('.u-content')
		let footer = this.elRef.nativeElement.parentElement.querySelector('.u-footer')
		if (this.sidebarMenu == undefined) {
			this.renderer.setElementAttribute(mainContent, "class", 'u-content');
			this.renderer.setElementAttribute(footer, "class", 'u-footer');
		} else {
			let mainContentClass = mainContent.getAttribute('class');
			this.renderer.setElementAttribute(mainContent, "class", mainContentClass + ' u-content-sidebar');
			let footerClass = footer.getAttribute('class');
			this.renderer.setElementAttribute(footer, "class", footerClass + ' u-footer-active');
		}
	}
	ngOnInit() {
		this.sidebarMenu = this._configService.getConfiguration().SIDE_BAR
		this.changeContentClass()

	}
	addTab(menu) {
		this.layoutComponent.addTab(menu)
	}
	showContent(event: any, menu) {
		event.preventDefault()
		let element = this.elRef.nativeElement.querySelector('.active-item')
		if (element != null) {
			this.renderer.setElementAttribute(element, "class", '');
		}
		let oldClasses = event.target.parentNode.parentNode.getAttribute('class');
		console.log(oldClasses)
		this.contentLabel = menu.name
		switch (oldClasses) {
			case '':
				this.renderer.setElementAttribute(event.target.parentNode.parentNode, "class", 'active-item');

				break;
			case 'active-item':
				this.renderer.setElementAttribute(event.target.parentNode.parentNode, "class", '');
				break
		}

		let tabmenuContents = this.elRef.nativeElement.querySelector('.layout-tabmenu-contents')
		let tabmenuContentsOldClasses = tabmenuContents.getAttribute('class');
		let mainContent = this.elRef.nativeElement.parentElement.querySelector('.u-content')
		let mainContentClass = mainContent.getAttribute('class');
		let footer = this.elRef.nativeElement.parentElement.querySelector('.u-footer')
		if (menu.children !== undefined && tabmenuContentsOldClasses.indexOf('tabmenu-contents-active') == -1) {
			this.renderer.setElementAttribute(tabmenuContents, "class", tabmenuContentsOldClasses + ' tabmenu-contents-active');
			this.renderer.setElementAttribute(mainContent, "class", mainContentClass + ' u-content-active');
			let footerClass = footer.getAttribute('class');
			this.renderer.setElementAttribute(footer, "class", footerClass + ' u-footer-active');

		} else {
			this.renderer.setElementAttribute(tabmenuContents, "class", ' layout-tabmenu-contents');
			this.renderer.setElementAttribute(mainContent, "class", 'u-content  u-content-sidebar');
			this.renderer.setElementAttribute(footer, "class", 'u-footer');
		}
		this.menuChildren = menu.children


	}
	hideContent(event) {
		let tabmenuContents = this.elRef.nativeElement.querySelector('.layout-tabmenu-contents')
		this.renderer.setElementAttribute(tabmenuContents, "class", 'layout-tabmenu-contents');
		let mainContent = this.elRef.nativeElement.parentElement.querySelector('.u-content')
		this.renderer.setElementAttribute(mainContent, "class", 'u-content   u-content-sidebar');
	}

}