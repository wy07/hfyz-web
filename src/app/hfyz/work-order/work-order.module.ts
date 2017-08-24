import { WorkOrderFlowService } from './shared/work-order-flow.service';
import { WorkOrderFlowComponent } from './flow/work-order-flow.component';
import { CustomDirectiveModule } from './../common/custom-directive.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableModule, PaginatorModule } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import { WorkOrderComponent } from './list/work-order.component';
import { WorkOrderService } from './shared/work-order.service';
import { PendingWorkOrderComponent } from './pending/pending-work-order.component';
import { FormsModule } from '@angular/forms';
import { FeedbackWorkOrderComponent } from './feedback/feedback-work-order.component';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [
        WorkOrderComponent,
        PendingWorkOrderComponent,
        FeedbackWorkOrderComponent,
        WorkOrderFlowComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        BrowserAnimationsModule,
        DataTableModule,
        PaginatorModule,
        FormsModule,
        TooltipModule,
        CustomDirectiveModule
    ],
    exports: [],
    providers: [
        DatePipe,
        WorkOrderService,
        WorkOrderFlowService
    ]
})
export class WorkOrderModule {
}
;
