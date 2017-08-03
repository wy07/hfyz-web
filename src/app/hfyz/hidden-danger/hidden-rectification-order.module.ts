import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {
  DataTableModule,
  DialogModule,
  ButtonModule,
  PaginatorModule, CalendarModule,
} from 'primeng/primeng';
import {CommonModule, DatePipe} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HiddenRectificationOrderService} from './shared/hidden-rectification-order.service';
import {HiddenRectificationOrderComponent} from './hidden-rectification-order.component';

@NgModule({
  declarations: [
    HiddenRectificationOrderComponent
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
    CalendarModule
  ],
  exports: [],
  providers: [
    DatePipe,
    HiddenRectificationOrderService
  ]
})
export class HiddenRectificationOrderModule {};
