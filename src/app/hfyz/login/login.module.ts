import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableModule, DialogModule, ListboxModule, ButtonModule, BlockUIModule } from 'primeng/primeng';
import {EventBuservice} from "../common/shared/eventbus.service";

@NgModule({
    declarations: [
        LoginComponent
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
        BlockUIModule
    ],
    exports: [
    ],
    providers: [
      EventBuservice
    ]
})
export class LoginModule { };
