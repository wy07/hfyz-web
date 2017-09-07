import { ElectricFenceComponent } from './electric-fence.component';
import { CustomDirectiveModule } from './../../common/custom-directive.module';
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
        ElectricFenceComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CustomDirectiveModule,
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
        TooltipModule,
    ],
    exports: [
    ],
    providers: [
      DatePipe,
    ]
})
export class ElectricFenceModule { };
