import { PlatFormService } from './shared/plat-form.service'
import { PlatFormComponent } from './plat-form.component';
import { CommonModule } from './../../common/common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableModule, DialogModule, ListboxModule, ButtonModule, DataGridModule, TreeModule, PaginatorModule, CalendarModule } from 'primeng/primeng';

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
        CommonModule,
        DataTableModule,
        DialogModule,
        ListboxModule,
        ButtonModule,
        DataGridModule,
        TreeModule,
        PaginatorModule,
        CalendarModule
    ],
    exports: [
    ],
    providers: [
      PlatFormService
    ]
})
export class PlatFormModule { };
