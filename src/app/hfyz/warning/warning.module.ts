import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {DropdownModule, DataTableModule, DialogModule, ButtonModule, PaginatorModule} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WarningComponent} from './warning.component';
import {WarningService} from './shared/warning.service';


@NgModule({
  declarations: [
    WarningComponent
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
    WarningService
  ]
})
export class WarningModule {
}
;
