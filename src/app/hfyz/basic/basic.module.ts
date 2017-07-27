import { OrganizationModule } from './organization/organization.module';
import { SystemCodeModule } from './systemCode/system-code.module';
import { ProjectMenuModule } from './menu/project-menu.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { PlatFormModule } from './platForm/plat-form.module';
import { NgModule } from '@angular/core';
import { MapSignModule } from './mapSign/map-sign.module';

@NgModule({
    imports: [
        RoleModule,
        UserModule,
        ProjectMenuModule,
        SystemCodeModule,
        OrganizationModule,
        PlatFormModule,
        MapSignModule
    ]
})
export class BasicModule { };
