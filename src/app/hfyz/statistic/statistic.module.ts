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
import {CompanyReportComponent} from './company-report/company-report.component';
import {CompanyReportService} from './company-report/company-report.service';

@NgModule({
    declarations: [
        CheckStatisticComponent,
        CompanyReportComponent
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
        StatisticService,
        CompanyReportService
    ]
})
export class StatisticModule {
};
