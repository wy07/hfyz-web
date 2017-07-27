import { CommonModule } from './../../common/common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InfoPublishService } from './info-publish.service';
import { InfoPublishComponent } from './info-publish.component';
import { NgModule } from '@angular/core';
import {DataTableModule, SharedModule, CalendarModule, DropdownModule, DialogModule, ListboxModule, ButtonModule, PaginatorModule} from 'primeng/primeng';
import { CKEditorModule } from 'ng2-ckeditor';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    InfoPublishComponent,
  ],
  imports: [
    CKEditorModule,
    DropdownModule,
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
    SharedModule,
    CalendarModule,
    PaginatorModule,
  ],
  exports: [
  ],
  providers: [
    InfoPublishService,
    DatePipe
  ]
})
export class InfoPublishModule { };
