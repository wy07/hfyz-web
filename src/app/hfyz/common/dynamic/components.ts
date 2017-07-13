import {OrganizationComponent} from './../../basic/organization/organization.component';
import {SystemCodeComponent} from './../../basic/systemCode/system-code.component';
import {MenuComponent} from './../../basic/menu/menu.component';
import {RoleComponent} from './../../basic/role/role.component';
import {UserComponent} from './../../basic/user/user.component';
import {LogManageComponent} from './../../log-manage/log-manage.component';
import {HomeComponent} from './../../home/home.component';
import {InfoPublishComponent} from '../../info-manage/info-publish/info-publish.component';
import {InfoCheckComponent} from '../../info-manage/info-check/info-check.component';
import {InfoListComponent} from '../../info-manage/info-list/info-list.component';
import {NullMapComponent} from "../../map/nullMap/null-map.component";
import {CarListComponent} from "../../car/list/car-list.component";
import {MapComponent} from "../../map/map/map.component";


export const components = {
  role: RoleComponent,
  user: UserComponent,
  menu: MenuComponent,
  systemcode: SystemCodeComponent,
  unit: SystemCodeComponent,
  home: HomeComponent,
  organization: OrganizationComponent,
  infoPublish: InfoPublishComponent,
  infoCheck: InfoCheckComponent,
  infoList: InfoListComponent,
  realTimeMap: MapComponent,
  historyMap: MapComponent,
  otherMap: MapComponent,
  nullMap: NullMapComponent,
  operationLog: LogManageComponent,
  carList: CarListComponent
};
