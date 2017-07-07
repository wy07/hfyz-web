import { OrganizationComponent } from './../../basic/organization/organization.component';
import { SystemCodeComponent } from './../../basic/systemCode/system-code.component';
import { MenuComponent } from './../../basic/menu/menu.component';
import { RoleComponent } from './../../basic/role/role.component';
import { UserComponent } from './../../basic/user/user.component';
import { LogManageComponent } from './../../log-manage/log-manage.component';
import { AdminComponent } from './../../admin/admin.component';
import { HomeComponent } from './../../home/home.component';
import { InfoPublishComponent } from '../../info-manage/info-publish/info-publish.component';
import { InfoCheckComponent } from '../../info-manage/info-check/info-check.component';
import { InfoListComponent } from '../../info-manage/info-list/info-list.component';

export const components = {
    role: RoleComponent,
    user: UserComponent,
    // admin: AdminComponent,
    menu: MenuComponent,
    systemcode: SystemCodeComponent,
    unit: SystemCodeComponent,
    home: HomeComponent,
    organization: OrganizationComponent,
    infoPublish: InfoPublishComponent,
    infoCheck: InfoCheckComponent,
    infoList: InfoListComponent,
    operationLog: LogManageComponent
};
