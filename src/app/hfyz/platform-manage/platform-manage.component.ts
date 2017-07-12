import {Component, Injector, OnInit, Renderer} from '@angular/core';
import {InputTextModule} from 'primeng/primeng';
import { Router, ActivatedRoute, ResolveData } from '@angular/router';
import {PlatformManageService} from './shared/platform-manage.service';
import {LayoutComponent} from '../layout/main-tab/layout.component';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-platform-manage',
  templateUrl: './platform-manage.component.html',
  styleUrls: ['./platform-manage.component.css']
})
export class PlatformManageComponent implements OnInit {
  platformList: any[];
  platform: any;

  platformName: string;
  platformCode: string;

  displayDialog: boolean;
  platformPositions: any[];
  formTitle: string;
  isAdd: boolean;

  constructor(private renderer: Renderer
    , private activatedRoute: ActivatedRoute
    , private toastr: ToastsManager
    , private platformService: PlatformManageService
    , private inj: Injector) {
    this.displayDialog = false;
    // this.platformPositions = [];
    // this.platformPositions.push({ label: 'TOP_BAR', value: 'TOP_BAR' });
    // this.platformPositions.push({ label: 'SIDE_BAR', value: 'SIDE_BAR' });
    this.clearForm();
  }
  ngOnInit() {
    this.initData();
  }
  initData() {
     this.platformService.list().subscribe(
     res => {
     this.platformList = res.platformList;
     }
     );
  }

// 清除dialog数据
  clearForm() {
    // this.filteredParents = [];
    // this.parent = null;
  }


}
