import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DataTableModule, PaginatorModule} from 'primeng/primeng';
import {DatePipe} from '@angular/common';
import {WorkOrderComponent} from './list/work-order.component';
import {CommonModule} from '../common/common.module';
import {WorkOrderService} from './shared/work-order.service';
import {PendingWorkOrderComponent} from "./pending/pending-work-order.component";
import {FormsModule} from '@angular/forms';
import {FeedbackWorkOrderComponent} from "./feedback/feedback-work-order.component";

@NgModule({
    declarations: [
        WorkOrderComponent,
        PendingWorkOrderComponent,
        FeedbackWorkOrderComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        BrowserAnimationsModule,
        CommonModule,
        DataTableModule,
        PaginatorModule,
        FormsModule
    ],
    exports: [],
    providers: [
        DatePipe,
        WorkOrderService
    ]
})
export class WorkOrderModule {
}
;
