import {NgModule} from '@angular/core';
import {ConfigureService} from './shared/configure.service';
import {HttpModule} from '@angular/http';
import {
  DataTableModule,
  DialogModule,
  ButtonModule,
  PaginatorModule,
  DropdownModule
} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigureComponent} from './configure.component';
import { TooltipModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [
    ConfigureComponent
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
    TooltipModule
  ],
  exports: [],
  providers: [
    ConfigureService
  ]
})
export class ConfigureModule {
}
;
