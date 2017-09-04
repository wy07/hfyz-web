import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import { PaginatorModule } from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InfoCenterService} from './shared/info-center.service';
import { TooltipModule } from 'ngx-bootstrap';
import {InfoCenterComponent} from './info-center.component';

@NgModule({
    declarations: [
        InfoCenterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CommonModule,
        PaginatorModule,
        TooltipModule
    ],
    exports: [],
    providers: [
        InfoCenterService
    ]
})
export class InfoCenterModule {
}
;
