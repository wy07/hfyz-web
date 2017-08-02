import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableModule, SharedModule, DialogModule, ListboxModule, ButtonModule, DataGridModule, TreeModule, PaginatorModule, CalendarModule } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import { DropdownModule } from 'primeng/primeng';
import {WorkOrderComponent} from './work-order.component';
import {CommonModule} from '../common/common.module';
import {WorkOrderService} from './shared/work-order.service';

@NgModule({
    declarations: [
      WorkOrderComponent
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
        DropdownModule
    ],
    exports: [
    ],
    providers: [
      DatePipe,
      WorkOrderService
    ]
})
export class WorkOrderModule { };
