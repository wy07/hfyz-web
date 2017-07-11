import {
  Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector,
  ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ApplicationInitStatus,
  ApplicationRef, AfterContentInit, AfterViewInit
} from '@angular/core';
import {components} from './components';
// import { RoleComponent } from './../../role/role.component';
// import {UserComponent} from './../../user/user.component';
import {AdminComponent} from './../../admin/admin.component';
import {MapService} from "../../map/shared/map.service";
// import { MenuListComponent } from './../../menu/list/menu-list.component';
@Component({
  selector: 'dynamic-container',
  entryComponents: Object.keys(components).map(key => components[key]),
  template: `
    <ng-template #container></ng-template>
    <div *ngIf="!loaded" class="loader"></div>
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
    //this.loadComponent()
  }

  ngOnInit() {
    // console.log(`ngOnInit:${JSON.stringify(this.inputs)}`)
    console.log(`ngOnInit:${this.componentName}`)
  }


  getaComponentName() {
    if (this.tab.hasMap && !this.tab.initMap) {
      return 'nullMap';
    } else {
      return this.tab.code;
    }
  }

  loadComponent() {

    console.log("======loadComponent:")
    let factory = this.resolver.resolveComponentFactory(components[this.getaComponentName()]);



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
    let component = this.container.createComponent(factory);

    /*this.initStatus.donePromise.then(() => {
     component =this.container.createComponent(factory);
     this.appRef.registerChangeDetector(component.changeDetectorRef);
     this.appRef.tick();
     });*/

    // detectChanges

    if(this.componentName!='nullMap'){
      setInterval(() => {
        component.changeDetectorRef.markForCheck();
      }, 50);
    }


    this.loaded = true;
    this.compRef = component;

    if(this.initMap){
      this.mapService.change.emit(`${this.inputs.code}`);
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
