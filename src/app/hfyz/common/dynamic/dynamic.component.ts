import {MapSignComponent} from './../../basic/mapSign/map-sign.component';
import {WarningComponent} from './../../warning/warning.component';
import {PeopleListComponent} from './../../people/list/people-list.component';
import {PlatFormComponent} from './../../basic/platForm/plat-form.component';
import {ChangePwdComponent} from './../../basic/user/changePwd/change-pwd.component';
import {CarListComponent} from './../../car/list/car-list.component';
import {NullMapComponent} from './../../map/nullMap/null-map.component';
import {MapComponent} from './../../map/map/map.component';
import {PlatformManageComponent} from './../../platform-manage/platform-manage.component';
import {LogManageComponent} from './../../log-manage/log-manage.component';
import {InfoListComponent} from './../../info-manage/info-list/info-list.component';
import {InfoCheckComponent} from './../../info-manage/info-check/info-check.component';
import {InfoPublishComponent} from './../../info-manage/info-publish/info-publish.component';
import {OrganizationComponent} from './../../basic/organization/organization.component';
import {HomeComponent} from './../../home/home.component';
import {SystemCodeComponent} from './../../basic/systemCode/system-code.component';
import {MenuComponent} from './../../basic/menu/menu.component';
import {UserComponent} from './../../basic/user/user.component';
import {RoleComponent} from './../../basic/role/role.component';
import {OwnerIdentityComponent} from '../../owner-identity/owner-identity.component';
import {ConfigureComponent} from './../../basic/configure/configure.component';
import {
    Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector,
    ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ApplicationInitStatus,
    ApplicationRef, AfterContentInit, AfterViewInit
} from '@angular/core';
import {components} from './components';
import {MapService} from '../../map/shared/map.service';
import {WorkOrderComponent} from '../../work-order/work-order.component';
import {BlackListComponent} from '../../roster/black-list/black-list.component';
import {WhiteListComponent} from '../../roster/white-list/white-list.component';
import {PermissionComponent} from '../../basic/permission/permission.component';
import {FreightWaybillComponent} from '../../waybill/freight-waybill/freight-waybill.component';
import {HiddenRectificationOrderComponent} from '../../hidden-rectification-order/order-list/hidden-rectification-order.component';
import {OrderExamineComponent} from '../../hidden-rectification-order/order-examine/order-examine.component';
import {EnterpriseFeedbackComponent} from '../../hidden-rectification-order/enterprise-feedback/enterprise-feedback.component';

@Component({
    selector: 'dynamic-container',
    // entryComponents: Object.keys(components).map(key => components[key]),
    entryComponents: [HomeComponent, RoleComponent, UserComponent, MenuComponent, SystemCodeComponent, OrganizationComponent,
        InfoPublishComponent, InfoCheckComponent, InfoListComponent, LogManageComponent, PlatformManageComponent,
        MapComponent, NullMapComponent, CarListComponent, ChangePwdComponent, PlatFormComponent, PeopleListComponent,
        WarningComponent, MapSignComponent, ConfigureComponent, HiddenRectificationOrderComponent, OwnerIdentityComponent,
        WorkOrderComponent, BlackListComponent, WhiteListComponent, PermissionComponent, FreightWaybillComponent,
        OrderExamineComponent, EnterpriseFeedbackComponent],
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
    @ViewChild('container', {read: ViewContainerRef})
    container: ViewContainerRef;
    @Input() componentName;
    @Input() inputs: any;
    @Input() tab: any;
    @Input() initMap: boolean;
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
        , private mapService: MapService) {
        // this.loadComponent()
    }

    ngOnInit() {
    }


    getaComponentName() {
        if (this.tab.hasMap && !this.tab.initMap) {
            return 'nullMap';
        } else {
            return this.tab.code;
        }
    }

    loadComponent() {

        console.log('======loadComponent:')
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

        if (this.componentName !== 'nullMap') {
            setInterval(() => {
                component.changeDetectorRef.markForCheck();
            }, 50);
        }


        this.loaded = true;
        this.compRef = component;

        if (!this.inputs) {
            this.inputs = {};
        }


        if (this.initMap) {
            this.mapService.change.emit(this.inputs);
        }


    }

    ngAfterContentInit() {
        this.loadComponent();
    }

    ngOnDestroy() {
        console.log(`======${this.componentName}=====ngOnDestroy=============`);
        if (this.compRef) {
            this.compRef.destroy();
        }
    }
}
