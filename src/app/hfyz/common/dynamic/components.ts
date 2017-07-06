import { OrganizationComponent } from './../../basic/organization/organization.component';
import { SystemCodeComponent } from './../../basic/systemCode/system-code.component';
import { MenuComponent } from './../../basic/menu/menu.component';
import { RoleComponent } from './../../basic/role/role.component';
import { UserComponent } from './../../basic/user/user.component';
import { LogManageComponent } from './../../logManage/log-manage.component';
import { AdminComponent } from './../../admin/admin.component';
// import { OrganizationComponent } from './../../organization/organization.component';
import { HomeComponent } from './../../home/home.component';

export const components = {
    role: RoleComponent,
    user: UserComponent,
    // admin: AdminComponent,
    menu: MenuComponent,
    systemcode: SystemCodeComponent,
    unit: SystemCodeComponent,
    home: HomeComponent,
    organization: OrganizationComponent,
    logManage: LogManageComponent
};
