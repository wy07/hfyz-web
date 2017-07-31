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
import {CommonModule} from './hfyz/common/common.module';
import {LogManageModule} from './hfyz/log-manage/log-manage.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import { DialogModule, ButtonModule, MessagesModule } from 'primeng/primeng';
import {PeopleModule} from './hfyz/people/people.module';
import {WarningModule} from './hfyz/warning/warning.module';
import {WorkOrderModule} from './hfyz/work-order/work-order.module';
import {PlatFormService} from './hfyz/basic/platForm/shared/plat-form.service';

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
    // , PlatformManageComponent
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
    RestangularModule.forRoot([Router, Http, ToastsManager], RestangularConfigFactory),
    LogManageModule,
    CommonModule,
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
    DialogModule,
    ButtonModule,
    MessagesModule
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
