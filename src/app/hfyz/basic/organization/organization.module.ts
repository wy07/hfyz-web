import { OrganizationService } from './shared/org.service';
import { OrganizationComponent } from './organization.component';
import { RoleModule } from './../role/role.module';
import { CommonModule } from './../../common/common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OrganizationChartModule } from 'primeng/primeng';

@NgModule({
    declarations: [
        OrganizationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CommonModule,
        OrganizationChartModule
    ],
    exports: [
    ],
    providers: [
        OrganizationService
    ]
})
export class OrganizationModule { };
