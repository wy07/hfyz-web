import { CompanyUserDirective } from './directive/company-user.directive';
import {RegularService} from './shared/regular.service';
import {PermissionDirective} from './directive/permission.directive';
import {NgModule} from '@angular/core';
import {EventBuservice} from './shared/eventbus.service';
import {AutoHeightDirective} from './directive/autoHeight.directive';

@NgModule({
    declarations: [
        PermissionDirective,
        AutoHeightDirective,
        CompanyUserDirective
    ],
    exports: [
        PermissionDirective,
        AutoHeightDirective,
        CompanyUserDirective
    ],
    providers: [
        RegularService,
        EventBuservice
    ]
})
export class CustomDirectiveModule {
}
;
