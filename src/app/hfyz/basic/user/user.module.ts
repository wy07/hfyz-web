import { CustomDirectiveModule } from './../../common/custom-directive.module';
import {RoleModule} from './../role/role.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {UserService} from './user.service';
import {UserComponent} from './user.component';
import {NgModule} from '@angular/core';
import {
    DataTableModule, DialogModule, ListboxModule, ButtonModule, PaginatorModule,
    AutoCompleteModule
} from 'primeng/primeng';
import {ChangePwdComponent} from './changePwd/change-pwd.component';
import { TooltipModule } from 'ngx-bootstrap';
@NgModule({
    declarations: [
        UserComponent,
        ChangePwdComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DataTableModule,
        DialogModule,
        ListboxModule,
        ButtonModule,
        RoleModule,
        PaginatorModule,
        TooltipModule,
        CustomDirectiveModule,
        AutoCompleteModule
    ],
    exports: [],
    providers: [
        UserService
    ]
})
export class UserModule {
}
;
