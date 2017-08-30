import { CommonModule } from '@angular/common';
import { CustomDirectiveModule } from './hfyz/common/custom-directive.module';
import {MapModule} from './hfyz/map/map.module';
import {InfoManageModule} from './hfyz/info-manage/info-manage.module';
import {SideBarComponent} from './hfyz/layout/side-bar/sidebar.component';
import {TopBarComponent} from './hfyz/layout/top-bar/topbar.component';
import {FooterComponent} from './hfyz/layout/footer/footer.component';
import {LayoutComponent} from './hfyz/layout/main-tab/layout.component';
import {AdminService} from './hfyz/admin/admin.service';
import {LoginModule} from './hfyz/login/login.module';
import {BasicModule} from './hfyz/basic/basic.module';
import {HomeModule} from './hfyz/home/home.module';
import {LogManageModule} from './hfyz/log-manage/log-manage.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Injector} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {RestangularModule} from 'ngx-restangular';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER} from '@angular/core';
import {ConfigService} from './hfyz/config/config.service';
import {RestangularConfigFactory} from './hfyz/common/restangular-config-factory';
import {Router} from '@angular/router';
import {ChangePwdService} from './hfyz/basic/user/changePwd/change-pwd.service';
import {AuthService} from './hfyz/security/auth.service';
import {AuthGuard} from './hfyz/security/auth.guard';
import {NoRightComponent} from './hfyz/security/noright.component';
import {ToastModule, ToastsManager} from 'ng2-toastr';
import {NgRadio} from 'ng-radio';
import {DynamicComponent} from './hfyz/common/dynamic/dynamic.component';
import {TabViewModule, BlockUIModule} from 'primeng/primeng';
import {PlatformManageModule} from './hfyz/platform-manage/platform-manage.module';
import {CarModule} from './hfyz/car/car.module';
import {DialogModule, ButtonModule, MessagesModule} from 'primeng/primeng';
import {PeopleModule} from './hfyz/people/people.module';
import {WarningModule} from './hfyz/warning/warning.module';
import {WorkOrderModule} from './hfyz/work-order/work-order.module';
import {OwnerIdentityModule} from './hfyz/owner-identity/owner-identity.module';
import {PlatFormService} from './hfyz/basic/platForm/shared/plat-form.service';
import {HiddenRectificationOrderModule} from './hfyz/hidden-rectification-order/hidden-rectification-order.module';
import { CovalentLoadingModule, TdLoadingService } from '@covalent/core';
import { StatisticModule } from './hfyz/statistic/statistic.module';
import {RosterModule} from './hfyz/roster/roster.module';
import {WaybillModule} from './hfyz/waybill/waybill.module';
import {TooltipModule} from 'ngx-bootstrap';
import {InfoCenterModule} from './hfyz/info-center/info-center.module';
export function ConfigLoader(configService: ConfigService) {
    // Note: this factory need to return a function (that return a promise)
    return () => configService.load();
}
@NgModule({
    declarations: [
        AppComponent
        , LayoutComponent
        , FooterComponent
        , TopBarComponent
        , SideBarComponent
        , NoRightComponent
        , DynamicComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RestangularModule,
        BrowserAnimationsModule,
        TabViewModule,
        ToastModule.forRoot(),
        RestangularModule.forRoot([Router, Http, ToastsManager, Injector], RestangularConfigFactory),
        LogManageModule,
        CustomDirectiveModule,
        HomeModule,
        BasicModule,
        LoginModule,
        InfoManageModule,
        MapModule,
        BlockUIModule,
        PlatformManageModule,
        CarModule,
        PeopleModule,
        WarningModule,
        WorkOrderModule,
        OwnerIdentityModule,
        DialogModule,
        ButtonModule,
        MessagesModule,
        HiddenRectificationOrderModule,
        RosterModule,
        CovalentLoadingModule,
        StatisticModule,
        WaybillModule,
        TooltipModule.forRoot(),
        CommonModule,
        InfoCenterModule
    ],
    /*providers: [ConfigService,
     {
     provide: APP_INITIALIZER,
     useFactory: ConfigLoader,
     deps: [ConfigService],
     multi:true
     }],*/
    providers: [ConfigService
        , {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [ConfigService],
            multi: true
        }
        , AuthGuard
        , AuthService
        , AdminService
        , NgRadio
        , ChangePwdService
        , PlatFormService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
