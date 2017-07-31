import {Component, Injector, OnInit, Renderer} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {RegularService} from '../../common/shared/regular.service';
import {RoleService} from '../../basic/role/role.service';
import {UserService} from '../../basic/user/user.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../security/auth.service';
import {InfoListService} from './info-list.service';


@Component({
  selector: 'info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.css']
})
export class InfoListComponent implements OnInit {

  publishList: any[];
  infoCategories: TreeNode[];
  selectedType: TreeNode;
  infoaudit: any;
  actionStr: string ;

  max: number;
  total: number;
  currentPage: number;
  type: string;
  user: any;
  currentUser: string;
  currentUserId: number
  currentRoleArray = []
  currentRoleString: string

  constructor(private _renderer: Renderer
    , private _router: Router
    , private _activatedRoute: ActivatedRoute
    , private _toastr: ToastsManager
    , private infoListService: InfoListService
    , private _inj: Injector
    , private _regularService: RegularService
    , private _roleService: RoleService
    , private _userService: UserService
    , private datePipe: DatePipe
    , private _authService: AuthService) {
    this.infoCategories = [{
      'label': '发布信息分类',
      'data': 'Documents Folder',
      'expanded': true,
      'expandedIcon': 'fa-minus-square-o',
      'collapsedIcon': 'fa-plus-square-o',
      'children': [{
        'label': '公告信息',
        'expandedIcon': 'fa-folder-open',
        'collapsedIcon': 'fa-minus',
      },
        {
          'label': '通知信息',
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-minus'
        },
        {
          'label': '通报信息',
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-minus'
        }, {
          'label': '政策法律法规',
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-minus'
        }, {
          'label': '行业标准',
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-minus'
        }, {
          'label': '部门规章',
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-minus'
        }
        ]
    },
    ];

    this.currentUser = this._authService.getCurrentUser('name')
    this.currentUserId = this._authService.getCurrentUser('id');
    this.currentRoleArray = this._authService.getCurrentUser('roleId').split(';');
    console.log(this.currentRoleArray)
    this.currentRoleString = this._authService.getCurrentUser('roleId');
    this.user = { id: '', operator: this.currentUserId };
    this.infoaudit = {};
    this.actionStr = 'list';
    this.max = 10;
    this.initData();
  }

  ngOnInit() {
  }

  /*initData() {
    this.infoListService.list(this.currentUserId).subscribe(
      res => {
        this.publishList = res.publishList;
      }
    );
  }*/

  initData(offset = 0) {
    this.infoListService.list(this.max, offset).subscribe(
      res => {
        this.publishList = res.publishList.publishList;
        this.total = res.publishList.total;
      }
    );
  }

  // 点击分页按钮
  paginate(event) {
    if (this.currentPage !== event.page) {
      this.currentPage = event.page;
      this.initData(this.max * event.page);
    }
  }

  onSelect(offset = 0) {
    this.type = this.selectedType.label;
    // console.log( this.type  );
    this.infoListService.select(this.type, this.max, offset).subscribe(
      res => {
        this.publishList = res.publishList.publishList;
        this.total = res.publishList.total;
      }
    );
  }

  onDisplay(infoaudit)  {
    this.infoListService.edit(infoaudit.id).subscribe(
      res => {
        if (res.result === 'success') {
          this.infoaudit = res.infoaudit;
          this.actionStr = 'details';
        } else {
          this._toastr.error('获取数据失败');
        }
      }
    );
  }

  onQuit() {
    this.actionStr = 'list';
  }

}
