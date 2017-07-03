// ./app/shared/shared.module.ts
import { NgModule } from '@angular/core';

import { PermissionDirective } from './permission.directive';

@NgModule({
    declarations: [
        PermissionDirective
    ],
    exports: [
        PermissionDirective
    ]
})
export class SharedPermissionModule{}