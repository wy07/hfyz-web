import { AuthService } from './../security/auth.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from '../admin/admin.service';
import { environment } from '../../../environments/environment';
import { ConfigService } from './../config/config.service';
@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['../../app.component.css', 'login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  appbrand: string;
  error: string;
  returnUrl: string;
  loading: Boolean;
  constructor(public _authService: AuthService
    , public _router: Router
    , public _http: Http
    , public _fb: FormBuilder
    , private _adminService: AdminService
    , private _activatedRoute: ActivatedRoute
    , public _configService: ConfigService) {
    this.loading = false;
    this.error = '';
    this.appbrand = environment.appbrand;
    this._activatedRoute.params.subscribe(params => {
      this.returnUrl = params['returnUrl'];

    });
    this.loginForm = this._fb.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(10)])]
      , password: ['', Validators.compose([Validators.required, Validators.maxLength(20)])]
    });
  }

  login(event) {
    this.loading = true;
    console.log('login');
    const body = this.loginForm.value;
    this._authService.login(this.loginForm.value).subscribe(
      /*return this._http.post(environment.grailsUrl+'api/login', {
              username: body.username,
              password: body.password
          }, { headers: HttpHeaders })
          .toPromise().then(*/
      response => {
        this.loading = false;
        const accesstoken = response && response.access_token;
        if (accesstoken) {
          sessionStorage.setItem('currentUser', JSON.stringify({
            username: body.username, token: accesstoken,
            roles: response.roles, refreshtoken: response.refresh_token
          }));
          this._authService.isLoggedIn = true;
          console.log(body.username);
          this._adminService.getUserByName(body.username).subscribe(data => {
            sessionStorage.removeItem('myprofile');
            sessionStorage.setItem('myprofile', JSON.stringify(data.user));
            console.log(data.user.roleRights);
            this._configService.setRoleRights(data.user.roleRights);
            const redirect = this._authService.redirectUrl ? this._authService.redirectUrl : '/';

            this._router.navigate([redirect]);
          }, err => {
            this.loading = false;
          });
        }
        console.log(sessionStorage.getItem('currentUser'));
      },
      error => {
        this.loading = false;
        this._authService.isLoggedIn = false;
        this.error = '用户名或密码不正确！';
        // this.renderPage(error)
      });
    /*this._authService.login(this.loginForm.value).then(
      result => {
      if (this._authService.isLoggedIn) {
           this._adminService.getUserByName(this.loginForm.value.username).then(data =>{
                  sessionStorage.removeItem('myprofile');
                  sessionStorage.setItem('myprofile',JSON.stringify(data.user))
                  //this._configService.load()
                  const redirect = this._authService.redirectUrl ? this._authService.redirectUrl : '/home';
                  console.log(redirect)
                  this._router.navigate([redirect]);
              })
      }else{
         this.error = '用户名或密码不正确！';
      }
    });*/

  }
  onConcel() {
    this._authService.logout();
  }
};
