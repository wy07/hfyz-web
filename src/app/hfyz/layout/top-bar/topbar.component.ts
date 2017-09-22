import {environment} from './../../../../environments/environment';
import {LayoutComponent} from './../main-tab/layout.component';
import {ConfigService} from './../../config/config.service';
import {AuthService} from './../../security/auth.service';
import {Component, OnInit, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {NgRadio} from 'ng-radio';
import {LayoutService} from '../shared/layout.service';
import {TdLoadingService} from '@covalent/core';

@Component({
    selector: 'u-topbar',
    templateUrl: 'topbar.component.html',
    styleUrls: ['../layout.component.css']
})

export class TopBarComponent implements OnInit {
    roleRights = [];
    topbarMenu: any;
    appbrand: string;
    layoutComponent: any;
    currentUser: string;
    unreadMessageCount: number;
    constructor(private _router: Router
        , private _authService: AuthService
        , private _configService: ConfigService
        , private radio: NgRadio
        , private inj: Injector
        , private _layoutService: LayoutService
        , private _loadingService: TdLoadingService) {
        this.unreadMessageCount = 0;
        this.layoutComponent = this.inj.get(LayoutComponent);
        radio.on('TOP_BAR').subscribe((topbarMenu) => {
            this.topbarMenu = topbarMenu;
        });
    };

    ngOnInit() {
        this.currentUser = sessionStorage.getItem('username'); // this._authService.getCurrentUser('name')
        this.topbarMenu = this._configService.getConfiguration().TOP_BAR;
        this.appbrand = environment.appbrand;
        this.unreadMessage();
        this.isShowPoint();
    }

    unreadMessage() {
        this._layoutService.unreadMessage().subscribe(
            res => {
                if (res.unreadMessageCount > 0) {
                    this.unreadMessageCount = res.unreadMessageCount;
                }
            }
        );
    }

    isShowPoint() {
        setInterval(() => {
         this.unreadMessage();
        }, 5000 * 60);
    }

    toRouter(routerLink) {
        console.log('====toRouter=====' + routerLink);
        if (routerLink.indexOf('root') === -1) {
            if (routerLink === 'closeall') {
                this.layoutComponent.closeAll();
            } else {
                let path = routerLink;
                if (path === 'logout') {
                    this._configService.load();
                    this._authService.logout();
                    path = 'login';
                }
                if (path === 'changepwd') {
                    this.addTab(path);
                    return
                }
                if (path === 'infoCenter') {
                    this.unreadMessageCount = 0;
                    this.addTab(path);
                    return
                }
                this._router.navigate([path]);
            }

        }
    }

    addTab(path) {
        let name = '';
        let i = this.topbarMenu.length;
        while (i--) {
           if (path === this.topbarMenu[i].code) {
              name = this.topbarMenu[i].name;
           }
        }
        const inputs = {name: name, selected: true, closable: true};
        this.layoutComponent.toTab(path, inputs);
    }
}
