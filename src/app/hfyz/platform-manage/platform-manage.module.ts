import {NgModule} from '@angular/core';
import {PlatformManageService} from './shared/platform-manage.service';
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
import {PlatformManageComponent} from './platform-manage.component';

@NgModule({
  declarations: [
    PlatformManageComponent
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
    PlatformManageService
  ]
})
export class PlatformManageModule {
}
;
