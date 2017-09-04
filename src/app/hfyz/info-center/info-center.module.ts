import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import { PaginatorModule } from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InfoCenterService} from './shared/info-center.service';
import {InfoCenterComponent} from './info-center.component';

@NgModule({
    declarations: [
        InfoCenterComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        BrowserAnimationsModule,
        CommonModule,
        PaginatorModule
    ],
    exports: [],
    providers: [
        InfoCenterService
    ]
})
export class InfoCenterModule {
}
;
