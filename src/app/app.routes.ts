import {NgModule}             from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
// Components

import {AuthGuard} from './hfyz/security/auth.guard';
import {LayoutComponent}  from './hfyz/layout/layout.component'
import {LoginComponent} from './hfyz/security/login.component';
import {NoRightComponent} from './hfyz/security/noright.component';
import {SystemCodeListComponent} from "./hfyz/systemCode/list/system-code-list.component";
import {MenuListComponent} from "./hfyz/menu/list/menu-list.component";
import {UserComponent} from "./hfyz/user/user.component"
const routes: Routes = [
  // Root

  {path: '', component: LayoutComponent, canActivate: [AuthGuard]}
  //, {path: 'home', component: LayoutComponent, canActivate: [AuthGuard]}
  //, {path: 'user', component: UserComponent}
  , {path: 'login', component: LoginComponent}
  , {path: 'noright', component: NoRightComponent}
  //, {path: 'system-codes/:type', component: SystemCodeListComponent, canActivate: [AuthGuard]}
  //, {path: 'system-codes/:type/create', component: SystemCodeEditComponent, canActivate: [AuthGuard]}
  //, {path: 'system-codes/:type/:id/edit', component: SystemCodeEditComponent, canActivate: [AuthGuard]}
  //, {path: 'menus', component: MenuListComponent, canActivate: [AuthGuard]}
  //, {path: 'menus/create', component: MenuEditComponent, canActivate: [AuthGuard]}
  //, {path: 'menus/:id/edit', component: MenuEditComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    //AuthGuard,
    //AuthService
  ]
})
export class AppRoutingModule {
}
