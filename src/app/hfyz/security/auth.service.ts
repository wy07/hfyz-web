import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import {Restangular} from "ngx-restangular";
@Injectable()
export class AuthService {
  public isLoggedIn: boolean = false;
  public redirectUrl: string;
  public token: string;
  constructor(private _restangular: Restangular) {
    if(sessionStorage.getItem('currentUser')){
      this.isLoggedIn = true
      var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
    }
  }
  /*public renderPage(error){
    console.log(error.status)
     switch(error.status){
       case 401:
          this.isLoggedIn = false
          this.token = null;
          sessionStorage.removeItem('currentUser');
          sessionStorage.removeItem('myprofile');
          this._router.navigate(['/login'])
        break
       case 403:
        this._router.navigate(['/noright'])
        break
       case 0:
          this._router.navigate(['/noright'])
        break
       case 500:
          console.log(error)
       break
     }
  }*/
  public getCurrentUser(field){
    if(sessionStorage.getItem('myprofile')===undefined || sessionStorage.getItem('myprofile')==null){
      //this._router.navigate(['/login']);
    }else{
      return JSON.parse(sessionStorage.getItem('myprofile'))[field]
    }
  }
  /*public formatDate = ( time: any ) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date( time );
      const year: number = Dates.getFullYear();
      const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + month + '-' + day+' '+this.digitalConverters(Dates.getHours()) + ':' + this.digitalConverters(Dates.getMinutes()) + ':' + this.digitalConverters(Dates.getSeconds());
    };
	digitalConverters(digital){
		return (String(digital).length >= 2) ? digital : '0' + digital
	}*/
  login(body) {
    //return this.restangular.all('api').customPOST('login',{username: body.username,password: body.password})
    return this._restangular.one('api').customPOST(body, 'login');
  }

  logout() {
    //return this.restangular.all('login').customPOST({},'index')

    /*let currentUser=JSON.parse(sessionStorage.getItem('currentUser'))
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization','Bearer '+currentUser.token);
    let options = new RequestOptions({ headers: headers });
    
    this._http.post(environment.grailsUrl+'logout/index', {
        },  options)
        .toPromise().then(response =>{
            console.log(response)
            this.isLoggedIn = false;
            this.token = null;
            sessionStorage.removeItem('currentUser');
            sessionStorage.removeItem('myprofile');
        },
				error => {
          this.isLoggedIn = false
          this.token = null;
          sessionStorage.removeItem('currentUser');
          sessionStorage.removeItem('myprofile');
          this.renderPage(error)
				});*/
    this.isLoggedIn = false;
    this.token = null;
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('myprofile');
  }
}