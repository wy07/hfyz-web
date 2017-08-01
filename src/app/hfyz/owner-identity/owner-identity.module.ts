/**
 * Created by wangyan on 2017/7/27.
 */
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {
  DataTableModule,
  ButtonModule,
  PaginatorModule,
  DialogModule,
} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OwnerIdentityComponent} from './owner-identity.component';
import {OwnerIdentityService} from './shared/owner-identity.service';

@NgModule({
  declarations: [
    OwnerIdentityComponent
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
    DialogModule
  ],
  exports: [],
  providers: [
    OwnerIdentityService
  ]
})
export class OwnerIdentityModule {
}
;
