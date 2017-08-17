import { CustomDirectiveModule } from './../../common/custom-directive.module';
import { MenuService } from './shared/menu.service';
import { MenuComponent } from './menu.component';
import { RoleModule } from './../role/role.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DialogModule, TreeTableModule, DropdownModule, AutoCompleteModule, ButtonModule } from 'primeng/primeng';
import {TooltipModule} from 'ngx-bootstrap';

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
        CustomDirectiveModule,
        DialogModule,
        TreeTableModule,
        DropdownModule,
        AutoCompleteModule,
        ButtonModule,
        TooltipModule
    ],
    exports: [
    ],
    providers: [
        MenuService,
    ]
})
export class ProjectMenuModule { };
