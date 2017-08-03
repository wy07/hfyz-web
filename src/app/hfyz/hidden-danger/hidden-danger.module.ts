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
import {HiddenDangerComponent} from './hidden-danger.component';
import {HiddenDangerService} from './shared/hidden-danger.service';

@NgModule({
  declarations: [
    HiddenDangerComponent
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
    HiddenDangerService
  ]
})
export class HiddenDangerModule {};
