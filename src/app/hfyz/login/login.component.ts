import {TdLoadingService} from '@covalent/core';
import {AuthService} from './../security/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Http} from '@angular/http';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {AdminService} from '../admin/admin.service';
import {environment} from '../../../environments/environment';
import {ConfigService} from './../config/config.service';
import {EventBuservice} from '../common/shared/eventbus.service';
@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['../../app.component.css', 'login.component.css']
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    appbrand: string;
    error: string;
    returnUrl: string;
    loading: Boolean;

    constructor(public _authService: AuthService
        , public _router: Router
        , public _fb: FormBuilder
        , private _activatedRoute: ActivatedRoute
        , public _configService: ConfigService
        , private _loadingService: TdLoadingService
        , private eventBuservice: EventBuservice) {

        this.loading = false;
        this.error = '';
        this.appbrand = environment.appbrand;
        this._activatedRoute.params.subscribe(params => {
            this.returnUrl = params['returnUrl'];

        });
        this.loginForm = this._fb.group({
            username: ['', Validators.compose([Validators.required, Validators.maxLength(11)])]
            , password: ['', Validators.compose([Validators.required, Validators.maxLength(20)])]
        });

    }

    ngOnInit() {
    }

    login(event) {
        console.log('login======');
        this._loadingService.register();
        const body = this.loginForm.value;
        console.log(`username:${this.loginForm.value.username}`)
        console.log(`password:${this.loginForm.value.password}`)
        this._authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
            res => {
                this._authService.isLoggedIn = true;
                console.log('--------in login ')
                this._authService.isLoggedIn = true;
                sessionStorage.setItem('currentUser', JSON.stringify({
                    username: this.loginForm.value.username
                    , password: this.loginForm.value.password
                    , token: res.token
                    , roles: res.roles
                }));
                sessionStorage.setItem('username', this.loginForm.value.username);
                sessionStorage.setItem('password', this.loginForm.value.password);
                sessionStorage.setItem('companyCode', res.companyCode);
                sessionStorage.setItem('token', res.token);

                this.eventBuservice.notify.emit({type: 'inspect', companyCode: res.companyCode});
                const redirect = this._authService.redirectUrl ? this._authService.redirectUrl : '/';
                console.log(`redirect:${redirect}`);
                console.log(res.rights);
                console.log(res.rights.split(';'));
                if (res.rights) {
                    sessionStorage.setItem('rights', res.rights)
                    console.log(sessionStorage.getItem('rights'));
                    this._configService.setRoleRights(res.rights.split(';'));
                } else {
                    sessionStorage.setItem('rights', '')
                }
                this._loadingService.resolve();
                this._router.navigate([redirect]);

                // this._adminService.getUserByName(res.sub).subscribe(data => {
                //   console.log('--------in getUserByName ')
                //   console.log(`data:${JSON.stringify(data)}`)
                //
                //   sessionStorage.removeItem('myprofile');
                //   sessionStorage.setItem('myprofile', JSON.stringify(data.user))
                //   console.log(data.user.roleRights);
                //   this._configService.setRoleRights(data.user.roleRights)
                //   console.log(redirect)
                // });
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
}
;
