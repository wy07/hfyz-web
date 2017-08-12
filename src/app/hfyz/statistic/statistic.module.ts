import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {
    DataTableModule,
    ButtonModule,
    PaginatorModule, CalendarModule,
    RadioButtonModule, InputTextModule
} from 'primeng/primeng';
import {CommonModule, DatePipe} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CheckStatisticComponent} from './check-statistic/check-statistic.component';
import {StatisticService} from './shared/statistic.service';
import {DatepickerModule} from 'ngx-bootstrap';
import {WorkOrderStatisticComponent} from "./work-order-statistic/work-order-statistic.component";

@NgModule({
    declarations: [
        CheckStatisticComponent,
        WorkOrderStatisticComponent
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
        CalendarModule,
        RadioButtonModule,
        InputTextModule,
        DatepickerModule.forRoot()
    ],
    exports: [],
    providers: [
        DatePipe,
        StatisticService
    ]
})
export class StatisticModule {
}
;
