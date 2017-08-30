import { CustomDirectiveModule } from './../common/custom-directive.module';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {
    DataTableModule,
    ButtonModule,
    PaginatorModule,
    DialogModule, CalendarModule, TabViewModule,
} from 'primeng/primeng';
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
        DataTableModule,
        ButtonModule,
        PaginatorModule,
        DialogModule,
        CalendarModule,
        TooltipModule,
        CustomDirectiveModule,
        TabViewModule
    ],
    exports: [],
    providers: [
        InfoCenterService
    ]
})
export class InfoCenterModule {
}
;
