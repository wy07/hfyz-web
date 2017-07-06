import { LogManageComponent } from './log-manage.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RestangularModule } from 'ngx-restangular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PanelModule} from 'primeng/primeng';

@NgModule({
    declarations: [
        LogManageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        PanelModule
    ],
    providers: [],
    bootstrap: []

})
export class LogManageModule {

}
