import { CustomDirectiveModule } from './../../common/custom-directive.module';
import { PlatFormService } from './shared/plat-form.service';
import { PlatFormComponent } from './plat-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableModule, DialogModule, ListboxModule, ButtonModule,
         DataGridModule, TreeModule, PaginatorModule, CalendarModule } from 'primeng/primeng';
import { DatePipe } from '@angular/common';

@NgModule({
    declarations: [
      PlatFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DataTableModule,
        DialogModule,
        ListboxModule,
        ButtonModule,
        DataGridModule,
        TreeModule,
        PaginatorModule,
        CalendarModule,
        CustomDirectiveModule
    ],
    exports: [
    ],
    providers: [
      PlatFormService,
      DatePipe
    ]
})
export class PlatFormModule { };
