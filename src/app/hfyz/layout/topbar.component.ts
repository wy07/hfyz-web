import { Component, OnInit, Injector } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../security/auth.service';
import { NgRadio } from 'ng-radio';
import { LayoutComponent } from './layout.component'
@Component({
	selector: 'u-topbar',
	templateUrl: 'topbar.component.html',
	styleUrls: ['layout.component.css']
})

export class TopBarComponent implements OnInit {
	roleRights = [];
	topbarMenu: any;
	appbrand: string;
	layoutComponent: any;
	currentUser:string;
	/*constructor(private configService: ConfigService) {
        //
    }*/
	constructor(
		private _router: Router
		, private _authService: AuthService
		, private _configService: ConfigService
		, private radio: NgRadio
		, private inj: Injector) {
		this.layoutComponent = this.inj.get(LayoutComponent);
		radio.on('TOP_BAR').subscribe((topbarMenu) => {
			this.topbarMenu = topbarMenu;
		});
	};
	ngOnInit() {
		this.currentUser=this._authService.getCurrentUser('name')
		this.topbarMenu = this._configService.getConfiguration().TOP_BAR;
		this.appbrand = environment.appbrand;

	}
	toRouter(routerLink) {
		console.log('====toRouter=====' + routerLink);
		if (routerLink.indexOf('root') === -1) {
			if (routerLink === 'closeall') {
				this.layoutComponent.closeAll();
			} else {
				let path = routerLink;
				if (path === 'logout') {
					this._authService.logout();
					path = 'login';
				}
				this._router.navigate([path]);
			}

		}
	}
}