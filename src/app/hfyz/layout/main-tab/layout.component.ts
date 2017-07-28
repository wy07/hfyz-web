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
import {MapService} from '../../map/shared/map.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'u-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['../layout.component.css']
})

export class LayoutComponent implements OnInit {
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

  @Input() panelTitle: string;
  @Input() activeMenu: string;
  @ViewChild(TabView) tabroot: TabView;
  @ViewChildren(DynamicComponent) dynamicContainers: QueryList<DynamicComponent>;

  initMap: boolean;


  constructor(private mapService: MapService) {
    this.initMap = false;
  };

  ngOnInit() {
    // this.handleChange({index:0});
  }

  onCloseTab(event) {
    const currentTab = this.tabs[event.index];
    if (!currentTab.initMap) {
      this.tabs.splice(event.index, 1);
      event.close();
    } else {
      this.tabs[event.index].disabled = true;
    }
    this.selectTab('home');
  }

  public addTab(menu) {
    const mapMenus = ['realTimeMap', 'historyMap', 'otherMap', 'realTimeMonitorMap'];
    this.initMap = false;
    if (mapMenus.find(x => x === menu.code) === undefined) {
      this.activeTab(menu);
    } else {
      const menuInputs = this.getInputs(menu.inputs, menu.code);
      if (menuInputs.id) {
        menuInputs['key'] = `${menu.code}-${menuInputs.id}`
      } else {
        menuInputs['key'] = `${menu.code}`
      }
      this.mapService.change.emit(menuInputs);

      // 如果没有地图，加载地图模板
      if (this.tabs.find(x => x.initMap === true) === undefined) {
        this.initMap = true;
        this.initMapTab(menu, menuInputs);
        return
      }

      const mapTab = this.tabs.find(x => x.hasMap === true && x.initMap === true);
      const mapTabIndex = this.tabs.findIndex(x => x.hasMap === true && x.initMap === true);
      const currentTab = this.tabs.find(x => x.code === menu.code);

      // 如果有地图，当前component未加载,新加tab并交换位置
      if (currentTab === undefined) {
        const newTab = {
          header: mapTab.header // menu.name
          , icon: mapTab.icon
          , selected: false
          , closable: true
          , disabled: false
          , index: mapTabIndex // + 1
          , code: mapTab.code
          , inputs: mapTab.inputs
          , hasMap: true
          , initMap: false
        };


        mapTab.header = menu.name;
        mapTab.icon = menu.icon;
        mapTab.selected = true;
        mapTab.index = this.tabs.length - 1;
        mapTab.code = menu.code;
        mapTab.inputs = menuInputs;
        this.tabs.push(newTab);
        this.tabs[mapTabIndex] = newTab;
        if (mapTab.disabled) {
          this.tabs.splice(mapTabIndex, 1);
          mapTab.disabled = false;
        }
        this.tabs[this.tabs.length - 1] = mapTab;
        this.selectTab(mapTab.code);
      } else if (mapTab.code === currentTab.code) {
        if (mapTab.disabled) {
          mapTab.disabled = false;
          this.tabs.splice(mapTabIndex, 1);
          mapTab.index = this.tabs.length;
          this.tabs.push(mapTab);
          this.selectTab(mapTab.code);
        } else {
          this.selectTab(mapTab.code);
        }
      } else { // 如果有地图，component已加载，交换位置
        const currentMapTabIndex = this.tabs.findIndex(x => x.code === currentTab.code);
        const tempTab = {
          header: mapTab.header // menu.name
          , icon: mapTab.icon
          , selected: false
          , disabled: mapTab.disabled
          , closable: true
          , index: mapTabIndex // + 1
          , code: mapTab.code
          , inputs: mapTab.inputs
          , hasMap: true
          , initMap: false
        };
        mapTab.header = menu.name;
        mapTab.icon = menu.icon;
        mapTab.selected = true;
        mapTab.index = this.tabs.length - 1;
        mapTab.code = menu.code;
        mapTab.inputs = menuInputs;
        mapTab.disabled = false;

        if (!tempTab.disabled) {
          this.tabs[mapTabIndex] = tempTab;
          this.tabs[currentMapTabIndex] = mapTab;

        } else {
          this.tabs[currentMapTabIndex] = mapTab;
          this.tabs.splice(mapTabIndex, 1);
        }
        this.selectTab(mapTab.code);
      }
    }
  }

  private getInputs(inputs, code) {
    if (!inputs) {
      return {code: code}
    }
    if (!inputs.hasOwnProperty('code')) {
      inputs.code = code;
    }
    return inputs;
  }

  private initMapTab(menu, inputs) {
    const index = this.tabs.length;
    this.tabs.push({
      header: menu.name
      , icon: menu.icon
      , selected: true
      , closable: true
      , disabled: false
      , index: index
      , code: menu.code
      , inputs: inputs
      , hasMap: true
      , initMap: true
    });
    this.selectTab(menu.code);
  }

  private activeTab(menu) {
    const tab = this.tabs.find(x => x.header === menu.name);
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
        , selected: false
        , closable: true
        , disabled: false
        , index: index
        , code: menu.code
        , inputs: JSON.parse(inputs)
        , hasMap: false
        , initMap: false
      });
      this.selectTab(menu.code);
    } else {
      this.selectTab(tab.code);
    }
  }

  selectTab(code) {
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].selected = false;
      this.tabs[i].index = i;
    }

    const index = this.tabs.findIndex(x => x.code === code);
    this.tabs[index].selected = true;
  }

  getComponentName(tab) {
    if (tab.hasMap && !tab.initMap) {
      return 'nullMap';
    } else {
      return tab.code;
    }
  }


  closeAll() {
    this.tabs = [];
    this.tabs.push(this.defaultTab);
    this.selectTab('home');
  }

  handleChange(event) {
    if (event.index === undefined) {
      return;
    }
    const currentTab = this.tabs[event.index];


    if (currentTab === undefined || !currentTab.hasMap) {
      return;
    }

    const mapTab = this.tabs.find(x => x.hasMap === true && x.initMap === true);
    const mapTabIndex = this.tabs.findIndex(x => x.hasMap === true && x.initMap === true);
    this.mapService.change.emit(currentTab.inputs);

    const tempTab = {
      header: mapTab.header // menu.name
      , icon: mapTab.icon
      , selected: false
      , disabled: mapTab.disabled
      , closable: true
      , index: mapTab.index // + 1
      , code: mapTab.code
      , inputs: mapTab.inputs
      , hasMap: true
      , initMap: false
    };
    mapTab.header = currentTab.header;
    mapTab.icon = currentTab.icon;
    mapTab.selected = false;
    mapTab.code = currentTab.icon;
    mapTab.index = currentTab.index;
    mapTab.code = currentTab.code;
    mapTab.inputs = currentTab.inputs;
    mapTab.disabled = false;

    if (!tempTab.disabled) {
      this.tabs[mapTabIndex] = tempTab;
      this.tabs[event.index] = mapTab;
    } else {
      this.tabs[event.index] = mapTab;
      this.tabs.splice(mapTabIndex, 1);

    }
    this.selectTab(mapTab.code);
  }
}
