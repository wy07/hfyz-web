import { RegularService } from './shared/regular.service';
import { PermissionDirective } from './directive/permission.directive';
import { NgModule } from '@angular/core';
import {EventBuservice} from './shared/eventbus.service';

@NgModule({
    declarations: [
        PermissionDirective
    ],
    exports: [
        PermissionDirective
    ],
    providers: [
        RegularService,
        EventBuservice
    ]
})
export class CommonModule { };
