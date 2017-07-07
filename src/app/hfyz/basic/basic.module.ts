import { OrganizationModule } from './organization/organization.module';
import { SystemCodeModule } from './systemCode/system-code.module';
import { ProjectMenuModule } from './menu/project-menu.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RoleModule,
        UserModule,
        ProjectMenuModule,
        SystemCodeModule,
        OrganizationModule
    ]
})
export class BasicModule { };
