import { LayoutComponent } from './hfyz/layout/main-tab/layout.component';
import { LoginComponent } from './hfyz/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './hfyz/security/auth.guard';
import { NoRightComponent } from './hfyz/security/noright.component';
const routes: Routes = [
  // Root

  { path: '', component: LayoutComponent, canActivate: [AuthGuard] }
  // , {path: 'home', component: LayoutComponent, canActivate: [AuthGuard]}
  // , {path: 'user', component: UserComponent}
  , { path: 'login', component: LoginComponent }
  , { path: 'noright', component: NoRightComponent }
  // , {path: 'system-codes/:type', component: SystemCodeListComponent, canActivate: [AuthGuard]}
  // , {path: 'system-codes/:type/create', component: SystemCodeEditComponent, canActivate: [AuthGuard]}
  // , {path: 'system-codes/:type/:id/edit', component: SystemCodeEditComponent, canActivate: [AuthGuard]}
  // , {path: 'menus', component: MenuListComponent, canActivate: [AuthGuard]}
  // , {path: 'menus/create', component: MenuEditComponent, canActivate: [AuthGuard]}
  // , {path: 'menus/:id/edit', component: MenuEditComponent, canActivate: [AuthGuard]}
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
    // AuthGuard,
    // AuthService
  ]
})
export class AppRoutingModule {
}
