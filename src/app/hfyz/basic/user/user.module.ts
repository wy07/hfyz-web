import { RoleModule } from './../role/role.module';
import { CommonModule } from './../../common/common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { DataTableModule, DialogModule, ListboxModule, ButtonModule } from 'primeng/primeng';
import { ChangePwdComponent } from './changePwd/change-pwd.component'
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
        CommonModule,
        DataTableModule,
        DialogModule,
        ListboxModule,
        ButtonModule,
        RoleModule,
    ],
    exports: [
    ],
    providers: [
        UserService
    ]
})
export class UserModule { };
