import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {RestangularModule} from 'ngx-restangular';

import {AppComponent} from './app.component';
import {AdminComponent} from './hfyz/admin/admin.component';

import {AppRoutingModule} from './app.routes';
import {LayoutComponent} from './hfyz/layout/layout.component';
import {FooterComponent} from './hfyz/layout/footer.component';
import {TopBarComponent} from './hfyz/layout/topbar.component';
import {SideBarComponent} from './hfyz/layout/sidebar.component';

import {SystemCodeListComponent} from './hfyz/systemCode/list/system-code-list.component';
import {SystemCodeService} from './hfyz/systemCode/shared/system-code.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  DropdownModule,
  PaginatorModule,
  GrowlModule,
  TreeModule,
  CheckboxModule,
  InputTextModule,
  MenubarModule,
  TabViewModule,
  InputTextareaModule,
  ButtonModule,
  TreeTableModule,
  TreeNode,
  SharedModule,
  PanelMenuModule,
  MenuItem,
  MenuModule,
  SplitButtonModule,
  CalendarModule,
  RadioButtonModule,
  DialogModule,
  InputSwitchModule,
  DataGridModule,
  PanelModule,
  MessagesModule,
  GMapModule,
  DataTableModule,
  ContextMenuModule,
  PickListModule,
  ToolbarModule,
  ScheduleModule,
  MultiSelectModule,
  AutoCompleteModule,
  ChartModule, ListboxModule
} from 'primeng/primeng';
import {OrganizationChartModule} from 'primeng/primeng';
import {APP_INITIALIZER} from '@angular/core';
import {ConfigService} from './hfyz/config/config.service';
import {environment} from '../environments/environment';
import {RestangularConfigFactory} from './hfyz/common/restangular-config-factory';
import {Router} from '@angular/router';

import {RoleComponent} from './hfyz/role/role.component';
import {UserComponent} from './hfyz/user/user.component';
import {AuthService} from './hfyz/security/auth.service'
import {AuthGuard} from './hfyz/security/auth.guard'
import {LoginComponent} from './hfyz/security/login.component';
import {NoRightComponent} from './hfyz/security/noright.component';
import {AdminService} from './hfyz/admin/admin.service';
import {ToastModule, ToastsManager} from 'ng2-toastr';
import {RegularService} from './hfyz/common/shared/regular.service';
import {NgRadio} from 'ng-radio';
import {DynamicComponent} from './hfyz/common/dynamic/dynamic.component';
import {MenuListComponent} from './hfyz/menu/list/menu-list.component';
import {MenuService} from './hfyz/menu/shared/menu.service';
import {RoleService} from './hfyz/role/role.service';
import {UserService} from './hfyz/user/user.service';
import {HomeComponent} from "./hfyz/home/home.component";
import {OrganizationComponent} from "./hfyz/organization/organization.component"
import {SharedPermissionModule} from './hfyz/common/permission/shared.module';
import {OrganizationService} from './hfyz/organization/shared/org.service';
import {RealTimeMapComponent} from "./hfyz/map/realTimeMap/real-time-map.component";
import {HistoryMapComponent} from "./hfyz/map/historyMap/history-map.component";
export function ConfigLoader(configService: ConfigService) {
  //Note: this factory need to return a function (that return a promise)
  return () => configService.load();
}
@NgModule({
  declarations: [
    AppComponent
    , LayoutComponent
    , FooterComponent
    , TopBarComponent
    , SideBarComponent
    , SystemCodeListComponent
    , LoginComponent
    , NoRightComponent
    , RoleComponent
    , UserComponent
    , AdminComponent
    , DynamicComponent
    , MenuListComponent
    , HomeComponent
    , OrganizationComponent
    , RealTimeMapComponent
    , HistoryMapComponent
  ],
  imports: [
    BrowserModule
    , FormsModule
    , HttpModule
    , ReactiveFormsModule
    , AppRoutingModule
    , RestangularModule
    , TreeTableModule
    , SharedModule
    , BrowserAnimationsModule
    , TreeTableModule, SharedModule, ButtonModule, InputTextareaModule
    , PanelMenuModule, MenuModule, TabViewModule, MenubarModule
    , InputTextModule, CheckboxModule, TreeModule, DropdownModule
    , PaginatorModule, GrowlModule, SplitButtonModule
    , CalendarModule, RadioButtonModule
    , DialogModule, InputSwitchModule, ListboxModule
    , DataGridModule
    , PanelModule
    , MessagesModule
    , GMapModule
    , DataTableModule
    , ContextMenuModule
    , PickListModule
    , ToolbarModule
    , ScheduleModule
    , MultiSelectModule
    , AutoCompleteModule
    , ChartModule
    , OrganizationChartModule
    , SharedPermissionModule
    , ToastModule.forRoot()
    , RestangularModule.forRoot([Router, Http, ToastsManager], RestangularConfigFactory)
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
    , AdminService
    , AuthService
    , SystemCodeService
    , MenuService
    , RegularService
    , RoleService
    , UserService
    , OrganizationService
    , NgRadio],
  bootstrap: [AppComponent]

})
export class AppModule {

}
