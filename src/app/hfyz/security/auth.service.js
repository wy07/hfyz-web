"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/add/observable/of");
require("rxjs/add/operator/do");
require("rxjs/add/operator/delay");
var AuthService = (function () {
    function AuthService(_restangular) {
        this._restangular = _restangular;
        this.isLoggedIn = false;
        if (sessionStorage.getItem('currentUser')) {
            this.isLoggedIn = true;
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
    AuthService.prototype.getCurrentUser = function (field) {
        if (sessionStorage.getItem('myprofile') === undefined || sessionStorage.getItem('myprofile') == null) {
        }
        else {
            return JSON.parse(sessionStorage.getItem('myprofile'))[field];
        }
    };
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
    AuthService.prototype.login = function (body) {
        //return this.restangular.all('api').customPOST('login',{username: body.username,password: body.password})
        return this._restangular.one('api').customPOST(body, 'login');
    };
    AuthService.prototype.logout = function () {
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
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
