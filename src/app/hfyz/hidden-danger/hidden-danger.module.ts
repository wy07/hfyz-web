import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {
  DropdownModule,
  DataTableModule,
  DialogModule,
  ButtonModule,
  PaginatorModule,
} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
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
    DropdownModule,
    PaginatorModule,
  ],
  exports: [],
  providers: [
    HiddenDangerService
  ]
})
export class HiddenDangerModule {
}
;
