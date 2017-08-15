import {CommonModule} from './../../common/common.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
    DataTableModule,
    ButtonModule,
    TreeModule,
    DropdownModule,
    PaginatorModule
} from 'primeng/primeng';
import {PermissionService} from "./permission.service";
import {PermissionComponent} from "./permission.component";
import {TooltipModule} from 'ngx-bootstrap';
@NgModule({
    declarations: [
        PermissionComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CommonModule,
        DataTableModule,
        ButtonModule,
        TreeModule,
        DropdownModule,
        PaginatorModule,
        TooltipModule
    ],
    exports: [],
    providers: [
        PermissionService
    ]
})
export class PermissionModule {
}
;
