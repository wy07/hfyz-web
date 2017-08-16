import { CustomDirectiveModule } from './../../common/custom-directive.module';
import {RoleComponent} from './role.component';
import {RoleService} from './role.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap';
import {
    DataTableModule,
    DialogModule,
    ListboxModule,
    ButtonModule,
    DataGridModule,
    TreeModule,
    DropdownModule,
    PaginatorModule
} from 'primeng/primeng';

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
        DataTableModule,
        DialogModule,
        ListboxModule,
        ButtonModule,
        DataGridModule,
        TreeModule,
        DropdownModule,
        PaginatorModule,
        TooltipModule,
        CustomDirectiveModule
    ],
    exports: [],
    providers: [
        RoleService
    ]
})
export class RoleModule {
}
;
