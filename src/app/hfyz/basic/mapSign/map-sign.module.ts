import { MapSignComponent } from './map-sign.component';
import { MapSignService } from './shared/map-sign.service';
import { CommonModule } from './../../common/common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableModule, SharedModule, DialogModule, ListboxModule,
         ButtonModule, DataGridModule, TreeModule, PaginatorModule, CalendarModule } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import {DropdownModule} from 'primeng/primeng';
import { TooltipModule } from 'ngx-bootstrap';
@NgModule({
    declarations: [
      MapSignComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CommonModule,
        DataTableModule,
        SharedModule,
        DialogModule,
        ListboxModule,
        ButtonModule,
        DataGridModule,
        TreeModule,
        PaginatorModule,
        CalendarModule,
        DropdownModule,
        TooltipModule
    ],
    exports: [
    ],
    providers: [
      DatePipe,
      MapSignService
    ]
})
export class MapSignModule { };
