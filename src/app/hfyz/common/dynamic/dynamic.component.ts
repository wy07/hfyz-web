import { ElectricFenceComponent } from './../../basic/electric-fence/electric-fence.component';
import { FreightWaybillApproveComponent } from './../../waybill/freight-waybill-approve/freight-waybill-approve.component';
import { AppEventEmittersService } from './../shared/app-event-emitters.service';
import { CarMonitorMapComponent } from './../../car/monitor-map/car-monitor-map.component';
import { CarHistoryMapComponent } from './../../car/history-map/car-history-map.component';
import { EmergencyPlanComponent } from './../../waybill/emergency-plan/emergency-plan.component';
import { WorkOrderFlowComponent } from './../../work-order/flow/work-order-flow.component';
import { OwnerIdentityStatisticComponent } from './../../statistic/owner-identity-statistic/owner-identity-statistic.component';
import { AlarmInfoStatisticComponent } from './../../statistic/alarm-info-statistic/alarm-info-statistic.component';
import { PassLineBusinessBasicComponent } from './../../waybill/pass-line-business-basic/pass-line-business-basic.component';
import { FreightRouteComponent } from './../../waybill/freight-route/freight-route.component';
import { PassLinePhysicalBasicComponent } from './../../waybill/pass-line-physical-basic/pass-line-physical-basic.component';
import { MapSignComponent } from '../../basic/mapSign/map-sign.component';
import { WarningComponent } from '../../warning/warning.component';
import { PeopleListComponent } from '../../people/list/people-list.component';
import { PlatFormComponent } from '../../basic/platForm/plat-form.component';
import { ChangePwdComponent } from '../../basic/user/changePwd/change-pwd.component';
import { CarListComponent } from '../../car/list/car-list.component';
import { PlatformManageComponent } from '../../platform-manage/platform-manage.component';
import { LogManageComponent } from '../../log-manage/log-manage.component';
import { InfoListComponent } from '../../info-manage/info-list/info-list.component';
import { InfoCheckComponent } from '../../info-manage/info-check/info-check.component';
import { InfoPublishComponent } from '../../info-manage/info-publish/info-publish.component';
import { OrganizationComponent } from '../../basic/organization/organization.component';
import { HomeComponent } from '../../home/home.component';
import { SystemCodeComponent } from '../../basic/systemCode/system-code.component';
import { MenuComponent } from '../../basic/menu/menu.component';
import { UserComponent } from '../../basic/user/user.component';
import { RoleComponent } from '../../basic/role/role.component';
import { OwnerIdentityComponent } from '../../owner-identity/owner-identity.component';
import { ConfigureComponent } from '../../basic/configure/configure.component';
import {
    Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector,
    ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ApplicationInitStatus,
    ApplicationRef, AfterContentInit, AfterViewInit
} from '@angular/core';
import { components } from './components';
import { WorkOrderComponent } from '../../work-order/list/work-order.component';
import { BlackListComponent } from '../../roster/black-list/black-list.component';
import { WhiteListComponent } from '../../roster/white-list/white-list.component';
import { PendingWorkOrderComponent } from '../../work-order/pending/pending-work-order.component';
import { HiddenRectificationOrderComponent } from '../../hidden-rectification-order/order-list/hidden-rectification-order.component';
import { OrderExamineComponent } from '../../hidden-rectification-order/order-examine/order-examine.component';
import { EnterpriseFeedbackComponent } from '../../hidden-rectification-order/enterprise-feedback/enterprise-feedback.component';
import { PermissionComponent } from '../../basic/permission/permission.component';
import { FeedbackWorkOrderComponent } from '../../work-order/feedback/feedback-work-order.component';
import { FreightWaybillComponent } from '../../waybill/freight-waybill/freight-waybill.component';
import { CheckStatisticComponent } from '../../statistic/check-statistic/check-statistic.component';
import { PassengerStatisticComponent } from '../../statistic/car-statistic/passenger-statistic/passenger-statistic.component';
import { TravelStatisticComponent } from '../../statistic/car-statistic/travel-statistic/travel-statistic.component';
import { CompanyReportComponent } from '../../statistic/company-report/company-report.component';
import { DangerousStatisticComponent } from '../../statistic/car-statistic/dangerous-statistic/dangerous-statistic.component';
import { WorkOrderStatisticComponent } from '../../statistic/work-order-statistic/work-order-statistic.component';
import { CarBasicStatisticsComponent } from '../../statistic/car-basic-statistics/car-basic-statistics.component';
import { CompanyRegulationComponent } from '../../owner-identity/company-regulation/company-regulation.component';
import { PlatformStatisticComponent } from '../../statistic/platform-statistic/platform-statistic.componemt';
import { CarRealTimeMapComponent } from '../../car/real-time-map/car-real-time-map.component';
import { InfoCenterComponent } from '../../info-center/info-center.component';
import { WorkOrderService } from '../../work-order/shared/work-order.service';
import { HiddenRectificationOrderService } from '../../hidden-rectification-order/shared/hidden-rectification-order.service';

@Component({
    selector: 'dynamic-container',
    // entryComponents: Object.keys(components).map(key => components[key]),
    entryComponents: [HomeComponent, RoleComponent, UserComponent, MenuComponent, SystemCodeComponent, OrganizationComponent,
        InfoPublishComponent, InfoCheckComponent, InfoListComponent, LogManageComponent, PlatformManageComponent,
        CarListComponent, ChangePwdComponent, PlatFormComponent, PeopleListComponent,
        WarningComponent, MapSignComponent, ConfigureComponent, HiddenRectificationOrderComponent, OwnerIdentityComponent,
        WorkOrderComponent, BlackListComponent, WhiteListComponent, OrderExamineComponent, EnterpriseFeedbackComponent,
        PermissionComponent, CheckStatisticComponent, PassengerStatisticComponent, PendingWorkOrderComponent,
        FeedbackWorkOrderComponent, FreightWaybillComponent, TravelStatisticComponent,
        FreightRouteComponent, PassLineBusinessBasicComponent, CompanyReportComponent, DangerousStatisticComponent,
        PassLinePhysicalBasicComponent, WorkOrderStatisticComponent, CarBasicStatisticsComponent,
        AlarmInfoStatisticComponent, OwnerIdentityStatisticComponent, CompanyRegulationComponent, PlatformStatisticComponent,
        WorkOrderFlowComponent, CarRealTimeMapComponent, CarHistoryMapComponent, CarMonitorMapComponent, InfoCenterComponent,
        EmergencyPlanComponent, FreightWaybillApproveComponent, ElectricFenceComponent
    ],

    template: `
    <ng-template #container></ng-template>
    <div *ngIf='!loaded' class='loader'></div>
  `,
    styles: [`
    .loader {
            position: relative;
            min-height: 100px;
        }
        .loader:after {
            content: '内容加载中，请耐心等待...';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    `]
})

export class DynamicComponent implements OnDestroy, OnInit, AfterContentInit {
    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;
    @Input() componentName;
    @Input() inputs: any;
    @Input() tab: any;
    loaded: boolean;
    compRef: ComponentRef<any>;


    /*_inited: boolean
     set inited(val: boolean) {
     if(val) {
     this.loadComponent();
     }
     this._inited = val;
     };

     get inited() {
     return this._inited;
     }*/
    constructor(private resolver: ComponentFactoryResolver
        , private initStatus: ApplicationInitStatus
        , private appRef: ApplicationRef
        , private _appEmitterService: AppEventEmittersService
        , private workorderService: WorkOrderService
        , private hiddenRectificationOrderService: HiddenRectificationOrderService) {
    }

    ngOnInit() {
    }


    getaComponentName() {
        return this.tab.code;
    }

    loadComponent() {
        const factory = this.resolver.resolveComponentFactory(components[this.getaComponentName()]);


        /*if(!this.inputs)
         this.inputs={}

         let inputProviders = Object.keys(this.inputs).map((inputName) => {
         console.log(inputName)
         return {provide: inputName, useValue: this.inputs[inputName]};});

         let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

         let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.container.parentInjector);
         let component = factory.create(injector);

         this.container.insert(component.hostView);
         if (this.compRef) {
         this.compRef.destroy();
         }*/
        const component = this.container.createComponent(factory);

        /*this.initStatus.donePromise.then(() => {
         component =this.container.createComponent(factory);
         this.appRef.registerChangeDetector(component.changeDetectorRef);
         this.appRef.tick();
         });*/

        // detectChanges

        setInterval(() => {
            component.changeDetectorRef.markForCheck();
        }, 500);
        this.loaded = true;
        this.compRef = component;

        if (this.inputs) {
            this._appEmitterService.tabChange.emit(this.inputs);
        }
    }

    ngAfterContentInit() {
        this.loadComponent();
    }

    ngOnDestroy() {
        if (this.compRef) {
            this.compRef.destroy();
        }
    }
}
