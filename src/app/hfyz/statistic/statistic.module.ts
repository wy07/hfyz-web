import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {
    DataTableModule,
    ButtonModule,
    PaginatorModule,
    CalendarModule,
    RadioButtonModule,
    InputTextModule,
    ChartModule
} from 'primeng/primeng';
import {CommonModule, DatePipe} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CheckStatisticComponent} from './check-statistic/check-statistic.component';
import {StatisticService} from './shared/statistic.service';
import {DatepickerModule, ProgressbarModule} from 'ngx-bootstrap';
import {PassengerStatisticComponent} from './car-statistic/passenger-statistic/passenger-statistic.component';
import {MapModule} from '../map/map.module';
import {TravelStatisticComponent} from './car-statistic/travel-statistic/travel-statistic.component';
import {DangerousStatisticComponent} from './car-statistic/dangerous-statistic/dangerous-statistic.component';
import {CompanyReportComponent} from './company-report/company-report.component';
import {CompanyReportService} from './company-report/company-report.service';
import {WorkOrderStatisticComponent} from './work-order-statistic/work-order-statistic.component';
import {CarBasicStatisticsComponent} from './car-basic-statistics/car-basic-statistics.component';
import { AngularEchartsModule } from 'ngx-echarts';
@NgModule({
  declarations: [
      CheckStatisticComponent,
      PassengerStatisticComponent,
      TravelStatisticComponent,
      DangerousStatisticComponent,
      CompanyReportComponent,
      WorkOrderStatisticComponent,
      CarBasicStatisticsComponent
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
    DatepickerModule.forRoot(),
    MapModule,
   ChartModule,
   AngularEchartsModule,
   ProgressbarModule.forRoot()
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
