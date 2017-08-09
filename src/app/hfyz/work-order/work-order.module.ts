import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableModule, PaginatorModule } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import { WorkOrderComponent } from './list/work-order.component';
import { CommonModule } from '../common/common.module';
import { WorkOrderService } from './shared/work-order.service';

@NgModule({
    declarations: [
      WorkOrderComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        BrowserAnimationsModule,
        CommonModule,
        DataTableModule,
        PaginatorModule
    ],
    exports: [
    ],
    providers: [
      DatePipe,
      WorkOrderService
    ]
})
export class WorkOrderModule { };
