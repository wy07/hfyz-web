import {DynamicComponent} from './../../common/dynamic/dynamic.component';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewChildren,
  ChangeDetectionStrategy,
  QueryList,
  Renderer,
  ElementRef
} from '@angular/core';
import {TabViewModule, TabView, TabPanel} from 'primeng/primeng';
import {MapService} from "../../map/shared/map.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'u-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['../layout.component.css']
})

export class LayoutComponent implements OnInit {
  @Input() panelTitle: string;
  @Input() activeMenu: string;
  @ViewChild(TabView) tabroot: TabView;
  @ViewChildren(DynamicComponent) dynamicContainers: QueryList<DynamicComponent>;

  initMap: boolean;


  constructor(private mapService: MapService) {
    this.initMap = false;
  };

  // {header: '首页', selected : true, closable : false,icon:'fa-home',index:0,code:'admin',lazy:false}
  public defaultTab = {
    header: '首页',
    selected: true,
    closable: false,
    disabled: false,
    icon: 'fa-home',
    index: 0,
    code: 'home',
    inputs: {},
    hasMap: false,
    initMap: false
  };
  public tabs = [{
    header: '首页',
    selected: true,
    closable: false,
    disabled: false,
    icon: 'fa-home',
    index: 0,
    code: 'home',
    inputs: {},
    hasMap: false,
    initMap: false
  }];

  ngOnInit() {
    this.handleChange(0);
  }

  onCloseTab(event) {
    let currentTab=this.tabs[event.index];
    if(!currentTab.initMap){
      console.log("======aaaa init");
      this.tabs.splice(event.index, 1);
      event.close();
    }else{
      this.tabs[event.index].disabled=true;
      this.tabroot.activeIndex = 0;
    }
  }

  public addTab(menu) {
    let mapMenus = ['realTimeMap', 'historyMap', 'otherMap'];

    console.log(`aaaa=${mapMenus.find(x => x === menu.code) === undefined}`);
    this.initMap = false;
    if (mapMenus.find(x => x === menu.code) === undefined) {
      console.log("=====1")
      this.activeTab(menu);
    } else {
      console.log('1')
      this.mapService.change.emit(`${menu.code}`);

      //如果没有地图，加载地图模板
      if (this.tabs.find(x => x.initMap === true) === undefined) {
        this.initMap = true;
        this.initMapTab(menu);
        return
      }
      console.log('2')



      let mapTab = this.tabs.find(x => x.hasMap === true && x.initMap === true);
      let mapTabIndex = this.tabs.findIndex(x => x.hasMap === true && x.initMap === true);
      let oldMapTabIndex = this.tabs.findIndex(x => x.code === mapTab.code);
      let currentTab = this.tabs.find(x => x.code === menu.code);

      console.log('3')

      //如果有地图，当前component未加载,新加tab并交换位置
      if (currentTab === undefined) {
        console.log('4')

        console.log(`currentTab === undefined`)

        let newTab = {
          header: mapTab.header //menu.name
          , icon: mapTab.icon
          , selected: false
          , closable: true
          , disabled: false
          , index: oldMapTabIndex + 1
          , code: mapTab.code
          , inputs: {code: mapTab.code}
          , hasMap: true
          , initMap: false
        };


        mapTab.header = menu.name;
        mapTab.icon = menu.icon;
        mapTab.selected = menu.true;
        mapTab.code = menu.icon;
        mapTab.index = this.tabs.length;
        mapTab.code = menu.code;
        mapTab.inputs = {code: menu.code};
        this.tabs.push(newTab);
        this.tabs[oldMapTabIndex] = newTab;

        console.log(`mapTab.disabled:${mapTab.disabled}`)

        if(mapTab.disabled){
          this.tabs.splice(oldMapTabIndex, 1);
          mapTab.disabled=false;
        }

        this.tabs[this.tabs.length - 1] = mapTab;



        console.log(`CODE:${this.tabs[this.tabs.length - 1].code}====this.tabs.length:${this.tabs.length}`);

        this.tabroot.activeIndex = this.tabs.length - 1;
      } else if (mapTab.code == currentTab.code) { //如果有地图，component已加载，交换位置
        console.log('5')

        console.log(`mapTab.code == currentTab.code`)
        if(mapTab.disabled){
          mapTab.disabled=false;
          mapTab.index = this.tabs.length;
          this.tabs.push(mapTab);
          this.tabs.splice(mapTabIndex, 1);
          this.tabroot.activeIndex = this.tabs.length - 1;

        }
      }else{
        console.log('6')

        console.log(`mapTab.code != currentTab.code`)


        let currentMapTabIndex = this.tabs.findIndex(x => x.code === currentTab.code);

        let tempTab = {
          header: mapTab.header //menu.name
          , icon: mapTab.icon
          , selected: false

          , disabled: false
          , closable: true
          , index: oldMapTabIndex + 1
          , code: mapTab.code
          , inputs: {code: mapTab.code}
          , hasMap: true
          , initMap: false
        };
        mapTab.header = menu.name;
        mapTab.icon = menu.icon;
        mapTab.selected = true;
        mapTab.code = menu.icon;
        mapTab.index = this.tabs.length;
        mapTab.code = menu.code;
        mapTab.inputs = {code: menu.code};


        this.tabs[oldMapTabIndex] = tempTab;
        this.tabs[currentMapTabIndex] = mapTab;
        this.tabroot.activeIndex = currentMapTabIndex;
      }
    }
    console.log("========tabs:")
    console.log(JSON.stringify(this.tabs))
  }

  private initMapTab(menu) {
    let index = this.tabs.length;

    this.tabs.push({
      header: menu.name
      , icon: menu.icon
      , selected: true
      , closable: true

      , disabled: false
      , index: index
      , code: menu.code
      , inputs: {code: menu.code}
      , hasMap: true
      , initMap: true
    });
    this.tabroot.activeIndex = index;
  }

  private activeTab(menu) {
    let tab = this.tabs.find(x => x.header === menu.name);
    let index = 0;

    if (tab === undefined) {
      let inputs = null;
      if (menu.parameter !== undefined) {
        inputs = menu.parameter;
      }
      index = this.tabs.length;

      this.tabs.push({
        header: menu.name
        , icon: menu.icon
        , selected: true
        , closable: true
        , disabled: false
        , index: index
        , code: menu.code
        , inputs: JSON.parse(inputs)
        , hasMap: false
        , initMap: false
      });
    } else {
      index = tab.index;
    }
    this.tabroot.activeIndex = index;
  }

  getComponentName(tab) {
    // console.log(`getComponentName1:${tab.hasMap}==${!tab.initMap}`)
    if (tab.hasMap && !tab.initMap) {
      return 'nullMap';
    } else {
      return tab.code;
    }
  }


  closeAll() {
    this.tabs = [];
    this.tabs.push(this.defaultTab);
    this.tabroot.activeIndex = 0;
  }

  handleChange(event) {
    console.log("in handleChange"+event.index);

    if (event.index === undefined){
      return;
    }
    let currentTab = this.tabs[event.index];
    if(currentTab===undefined||!currentTab.hasMap){
      return;
    }
    let mapTab = this.tabs.find(x => x.hasMap === true && x.initMap === true);

    let oldMapTabIndex = this.tabs.findIndex(x => x.hasMap === true && x.initMap === true);
    this.mapService.change.emit(`${currentTab.code}`);

    let tempTab = {
      header: mapTab.header //menu.name
      , icon: mapTab.icon
      , selected: false

      , disabled: false
      , closable: true
      , index: oldMapTabIndex + 1
      , code: mapTab.code
      , inputs: {code: mapTab.code}
      , hasMap: true
      , initMap: false
    };
    mapTab.header = currentTab.header;
    mapTab.icon = currentTab.icon;
    mapTab.selected = true;
    mapTab.code = currentTab.icon;
    mapTab.index = currentTab.index;
    mapTab.code = currentTab.code;
    mapTab.inputs =currentTab.inputs;

    console.log(`oldMapTabIndex:${oldMapTabIndex},event.index:${event.index}`)

    this.tabs[oldMapTabIndex] = tempTab;
    this.tabs[event.index] = mapTab;
    this.tabroot.activeIndex = event.index;


  }
}
