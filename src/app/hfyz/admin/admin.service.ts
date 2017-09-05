import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { AuthService } from '../security/auth.service';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class AdminService {
  constructor(public restangular: Restangular, private _authService: AuthService) {

  }


  getRoles() {
    return this.restangular.all('sysusers').customGET('get-roles');
  }
  getUserByName(name) {
    return this.restangular.all('sysusers').customGET('get-user-by-name', { name: name });
  }

}
