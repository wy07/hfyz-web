import { PassLineBusinessBasicComponent } from './../../waybill/pass-line-business-basic/pass-line-business-basic.component';
import { FreightRouteComponent } from './../../waybill/freight-route/freight-route.component';
import { PermissionComponent } from './../../basic/permission/permission.component';
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
import {NullMapComponent} from '../../map/nullMap/null-map.component';
import {CarListComponent} from '../../car/list/car-list.component';
import {MapComponent} from '../../map/map/map.component';
import {ChangePwdComponent} from '../../basic/user/changePwd/change-pwd.component';
import {PlatFormComponent} from '../../basic/platForm/plat-form.component';
import {PlatformManageComponent} from '../../platform-manage/platform-manage.component';
import {PeopleListComponent} from '../../people/list/people-list.component';
import {WarningComponent} from '../../warning/warning.component';
import {MapSignComponent} from '../../basic/mapSign/map-sign.component';
import {OwnerIdentityComponent} from '../../owner-identity/owner-identity.component';
import {ConfigureComponent} from '../../basic/configure/configure.component';
import {PendingWorkOrderComponent} from '../../work-order/pending/pending-work-order.component';
import {BlackListComponent} from '../../roster/black-list/black-list.component';
import {WhiteListComponent} from '../../roster/white-list/white-list.component';
import {FreightWaybillComponent} from '../../waybill/freight-waybill/freight-waybill.component';
import {HiddenRectificationOrderComponent} from '../../hidden-rectification-order/order-list/hidden-rectification-order.component';
import {OrderExamineComponent} from '../../hidden-rectification-order/order-examine/order-examine.component';
import {EnterpriseFeedbackComponent} from '../../hidden-rectification-order/enterprise-feedback/enterprise-feedback.component';
import {WorkOrderComponent} from '../../work-order/list/work-order.component';
import {FeedbackWorkOrderComponent} from '../../work-order/feedback/feedback-work-order.component';
import {CheckStatisticComponent} from '../../statistic/check-statistic/check-statistic.component';
import {PassengerStatisticComponent} from '../../statistic/car-statistic/passenger-statistic/passenger-statistic.component';
import {ShowDetailComponent} from '../../statistic/car-statistic/show-detail/show-detail.component';
import {TravelStatisticComponent} from '../../statistic/car-statistic/travel-statistic/travel-statistic.component';
import {CompanyReportComponent} from '../../statistic/company-report/company-report.component';
import {DangerousStatisticComponent} from '../../statistic/car-statistic/dangerous-statistic/dangerous-statistic.component';
export const components = {
  role: RoleComponent,
  permission: PermissionComponent,
  user: UserComponent,
  menu: MenuComponent,
  systemcode: SystemCodeComponent,
  unit: SystemCodeComponent,
  home: HomeComponent,
  organization: OrganizationComponent,
  infoPublish: InfoPublishComponent,
  infoCheck: InfoCheckComponent,
  infoList: InfoListComponent,
  operationLog: LogManageComponent,
  platformManage: PlatformManageComponent,
  realTimeMap: MapComponent,
  realTimeMonitorMap: MapComponent,
  historyMap: MapComponent,
  otherMap: MapComponent,
  nullMap: NullMapComponent,
  carList: CarListComponent,
  changepwd: ChangePwdComponent,
  ownerCheckRecord: PlatFormComponent,
  peopleList: PeopleListComponent,
  warning: WarningComponent,
  mapSign: MapSignComponent,
  configure: ConfigureComponent,
  hiddenDanger: HiddenRectificationOrderComponent,
  workOrder: WorkOrderComponent,
  ownerIdentity: OwnerIdentityComponent,
  blackList: BlackListComponent,
  whiteList: WhiteListComponent,
  orderExamine: OrderExamineComponent,
  enterpriseFeedback: EnterpriseFeedbackComponent,
  checkStatistic: CheckStatisticComponent,
  freightWaybill: FreightWaybillComponent,
  passengerStatistic: PassengerStatisticComponent,
  pendingWorkOrder: PendingWorkOrderComponent,
  feedbackWorkOrder: FeedbackWorkOrderComponent,
  showDetail: ShowDetailComponent,
  travelStatistic: TravelStatisticComponent,
  waybillRoute: FreightRouteComponent,
  passLineBusinessInfo: PassLineBusinessBasicComponent,
  companyReport: CompanyReportComponent,
  dangerousStatistic: DangerousStatisticComponent
};
