import {InfoCheckComponent} from './info-check/info-check.component';
import {InfoListComponent} from './info-list/info-list.component';
import {NgModule} from '@angular/core';
import {DataTableModule, SharedModule, CalendarModule, DropdownModule, PaginatorModule} from 'primeng/primeng';
import {TreeModule} from 'primeng/primeng';
import {InfoPublishService} from './info-publish/info-publish.service';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {InfoPublishModule} from './info-publish/info-publish.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { DatePipe } from '@angular/common';
import {InfoListService} from './info-list/info-list.service';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
   // InfoPublishComponent,
    InfoListComponent,
    InfoCheckComponent
  ],
  imports: [
    InfoPublishModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    DropdownModule,
    DataTableModule
    , SharedModule
    , CalendarModule
    , TreeModule
    , CKEditorModule
    , PaginatorModule
    , TooltipModule
  ],
  exports: [],
  providers: [
    InfoPublishService,
    InfoListService,
    DatePipe

  ]
})
export class InfoManageModule {
}
;
