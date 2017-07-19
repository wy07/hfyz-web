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
    /*return this.http.get(environment.grailsUrl+'sysuser/getRoles',this.getAuthHeader()).toPromise().then(res=> {
        return res.json()
    }, error=> {
        this._authService.renderPage(error)
    })*/
  }
  getUserByName(name) {
    console.log(name)
    return this.restangular.all('sysusers').customGET('get-user-by-name', { name: name });
    /*return this.http.get(environment.grailsUrl+'sysuser/getUserByName?name='+name,this.getAuthHeader()).toPromise().then(res=> {
      return res.json()
    }, error=> {
      this._authService.renderPage(error)
    })*/
  }

}
