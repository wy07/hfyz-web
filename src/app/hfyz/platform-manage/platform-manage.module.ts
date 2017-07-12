import { NgModule } from '@angular/core';
import {PlatformManageComponent} from './platform-manage.component';
import {PlatformManageService} from './shared/platform-manage.service';
import {HttpModule} from '@angular/http';
import { DataTableModule, DialogModule, ListboxModule, ButtonModule, DataGridModule, TreeModule } from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    ListboxModule,
    ButtonModule,
    DataGridModule,
    TreeModule,
  ],
  exports: [
  ],
  providers: [
    PlatformManageService
  ]
})
export class PlatformManageModule { };
