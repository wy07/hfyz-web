import {RegularService} from './shared/regular.service';
import {PermissionDirective} from './directive/permission.directive';
import {NgModule} from '@angular/core';
import {EventBuservice} from './shared/eventbus.service';
import {AutoHeightDirective} from "./directive/autoHeight.directive";

@NgModule({
    declarations: [
        PermissionDirective,
        AutoHeightDirective
    ],
    exports: [
        PermissionDirective,
        AutoHeightDirective
    ],
    providers: [
        RegularService,
        EventBuservice
    ]
})
export class CommonModule {
}
;
