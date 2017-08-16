import { CustomDirectiveModule } from './../../common/custom-directive.module';
import { SystemCodeService } from './shared/system-code.service';
import { SystemCodeComponent } from './system-code.component';
import { RoleModule } from './../role/role.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DropdownModule, TreeTableModule, AutoCompleteModule, DialogModule, ButtonModule } from 'primeng/primeng';
import { TooltipModule } from 'ngx-bootstrap';
@NgModule({
    declarations: [
        SystemCodeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DropdownModule,
        TreeTableModule,
        AutoCompleteModule,
        DialogModule,
        ButtonModule,
        TooltipModule,
        CustomDirectiveModule
    ],
    exports: [
    ],
    providers: [
        SystemCodeService
    ]
})
export class SystemCodeModule { };
