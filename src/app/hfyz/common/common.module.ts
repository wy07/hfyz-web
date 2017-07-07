import { RegularService } from './shared/regular.service';
import { PermissionDirective } from './directive/permission.directive';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        PermissionDirective
    ],
    exports: [
        PermissionDirective
    ],
    providers: [
        RegularService
    ]
})
export class CommonModule { };
