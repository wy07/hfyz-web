import { AppEventEmittersService } from './../../common/shared/app-event-emitters.service';
import { DynamicComponent } from '../../common/dynamic/dynamic.component';
import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ViewChildren,
    ChangeDetectionStrategy,
    QueryList
} from '@angular/core';
import { TabView } from 'primeng/primeng';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'u-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['../layout.component.css']
})

export class LayoutComponent implements OnInit {
    tabs: any[];

    @Input() panelTitle: string;
    @Input() activeMenu: string;
    @ViewChild(TabView) tabroot: TabView;
    @ViewChildren(DynamicComponent) dynamicContainers: QueryList<DynamicComponent>;

    constructor(private _appEmitterService: AppEventEmittersService) {
        this.tabs = [{
            header: '首页',
            selected: true,
            closable: false,
            disabled: false,
            icon: 'fa-home',
            index: 0,
            code: 'home',
            inputs: {},
            hasMap: false,
        }];
    };

    ngOnInit() {
    }

    onCloseTab(event) {
        this.tabs.splice(event.index, 1);
        event.close();
        this.selectTab('home');
    }

    public toTab(menu, inputs): Promise<any> {
        return new Promise(resolve => {
            if (inputs) {
                const menuInputs = this.getInputs(inputs, menu.code);
                this._appEmitterService.tabChange.emit(menuInputs);
            }
            this.activeTab(menu, inputs);
            resolve('success');
        })
    }

    public addTab(menu): Promise<any> {
        return new Promise(resolve => {
            if (menu.inputs) {
                const menuInputs = this.getInputs(menu.inputs, menu.code);
                this._appEmitterService.tabChange.emit(menuInputs);
            }
            this.activeTab(menu, menu.inputs);
            resolve('success');
        })
    }

    private getInputs(inputs, code) {
        if (!inputs) {
            return { code: code }
        }
        if (!inputs.hasOwnProperty('code')) {
            inputs.code = code;
        }
        return inputs;
    }

    private activeTab(menu, inputs) {
        const tab = this.tabs.find(x => x.header === menu.name);
        let index = 0;
        if (tab === undefined) {
            index = this.tabs.length;
            this.tabs.push({
                header: menu.name
                , icon: menu.icon
                , selected: false
                , closable: true
                , disabled: false
                , index: index
                , code: menu.code
                , inputs: inputs ? inputs : {}
                , hasMap: false
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
        this.tabroot.activeIndex = index;
    }

    getComponentName(tab) {
        return tab.code;
    }


    closeAll() {
        for (let i = this.tabs.length - 1; i > 0; i--) {
            if (this.tabs[i].code === 'home') {
                continue;
            }
            this.tabs.splice(i, 1);
        }
        this.selectTab('home');
    }

    handleChange(event) {

    }
}
