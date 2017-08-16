import { CustomDirectiveModule } from './../common/custom-directive.module';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {
  DataTableModule,
  DialogModule,
  ButtonModule,
  PaginatorModule, CalendarModule,
  AutoCompleteModule,
  RadioButtonModule,
  DropdownModule
} from 'primeng/primeng';
import {CommonModule, DatePipe} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HiddenRectificationOrderComponent} from './order-list/hidden-rectification-order.component';
import {HiddenRectificationOrderService} from './shared/hidden-rectification-order.service';
import {EnterpriseFeedbackComponent} from './enterprise-feedback/enterprise-feedback.component';
import {OrderExamineComponent} from './order-examine/order-examine.component';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    HiddenRectificationOrderComponent,
    EnterpriseFeedbackComponent,
    OrderExamineComponent
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
    ButtonModule,
    PaginatorModule,
    CalendarModule,
    AutoCompleteModule,
    RadioButtonModule,
    DropdownModule,
    TooltipModule,
    CustomDirectiveModule
  ],
  exports: [],
  providers: [
    DatePipe,
    HiddenRectificationOrderService
  ]
})
export class HiddenRectificationOrderModule {};
