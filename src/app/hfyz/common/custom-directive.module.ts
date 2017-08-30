import { CustomDialogService } from './shared/custom-dialog.service';
import { CovalentDialogsModule } from '@covalent/core';
import { CompanyUserDirective } from './directive/company-user.directive';
import { RegularService } from './shared/regular.service';
import { PermissionDirective } from './directive/permission.directive';
import { NgModule } from '@angular/core';
import { EventBuservice } from './shared/eventbus.service';
import { AutoHeightDirective } from './directive/autoHeight.directive';
import {AdminDirective} from './directive/admin.directive';

@NgModule({
    imports: [
        CovalentDialogsModule
    ],
    declarations: [
        PermissionDirective,
        AutoHeightDirective,
        CompanyUserDirective,
        AdminDirective
    ],
    exports: [
        PermissionDirective,
        AutoHeightDirective,
        CompanyUserDirective,
        AdminDirective
    ],
    providers: [
        RegularService,
        EventBuservice,
        CustomDialogService
    ]
})
export class CustomDirectiveModule {
}
;
