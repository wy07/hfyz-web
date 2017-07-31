import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService
    , private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const url: string = state.url;
    if (this._authService.getCurrentUser('roleRights') === undefined) {
      this._router.navigate(['/login'])
    } else {
      if (this._authService.getCurrentUser('username') === 'me') {
        return this.checkLogin(url);
      } else {
        if (this._authService.getCurrentUser('roleRights').indexOf(url.split('/')[1]) > -1) {
          return this.checkLogin(url);
        } else {
          this._router.navigate(['/noright'])
        }
      }
    }
  }

  checkLogin(url: string): boolean {
    if (this._authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this._authService.redirectUrl = url;
    const sessionId = 123456789;
    // Navigate to the login page with extras
    const navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this._router.navigate(['/login'], navigationExtras);

    return false;
  }
};
