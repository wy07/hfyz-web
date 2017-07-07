import { RoleComponent } from './role.component';
import { RoleService } from './role.service';
import { CommonModule } from './../../common/common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableModule, DialogModule, ListboxModule, ButtonModule, DataGridModule, TreeModule } from 'primeng/primeng';

@NgModule({
    declarations: [
        RoleComponent
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
    ],
    exports: [
    ],
    providers: [
        RoleService
    ]
})
export class RoleModule { };
