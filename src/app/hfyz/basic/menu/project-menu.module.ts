import { MenuService } from './shared/menu.service';
import { MenuComponent } from './menu.component';
import { RoleModule } from './../role/role.module';
import { CommonModule } from './../../common/common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DialogModule, TreeTableModule, DropdownModule, AutoCompleteModule, ButtonModule } from 'primeng/primeng';

@NgModule({
    declarations: [
        MenuComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CommonModule,
        DialogModule,
        TreeTableModule,
        DropdownModule,
        AutoCompleteModule,
        ButtonModule
    ],
    exports: [
    ],
    providers: [
        MenuService,
    ]
})
export class ProjectMenuModule { };
