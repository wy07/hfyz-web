import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Configuration } from './config';
import { environment } from '../../../environments/environment';
import { Restangular } from 'ngx-restangular';
import { Router, ActivatedRoute } from '@angular/router';
import { NgRadio } from 'ng-radio';
import { AuthService } from './../security/auth.service';
@Injectable()
export class ConfigService {
  private config: Configuration;
  constructor(private _restangular: Restangular
    , private _radio: NgRadio
    , private _authService: AuthService) { }

  load() {
    return new Promise((resolve) => {
      this._restangular.all('system-codes').customGET('getmenu').subscribe(config => {
        console.log('######');
        console.log(config);
        this.config = config;
        this._radio.cast('TOP_BAR', this.config.TOP_BAR);
        this._radio.cast('SIDE_BAR', this.config.SIDE_BAR);
        resolve();
      });
    });
  }
  setRoleRights(ROLE_RIGHTS) {
    this.config.ROLE_RIGHTS = ROLE_RIGHTS;
  }
  getConfiguration(): Configuration {
    if (this.config.ROLE_RIGHTS == null) {
      this.config.ROLE_RIGHTS = this._authService.getCurrentUser('roleRights');
    }
    return this.config;
  }
};
