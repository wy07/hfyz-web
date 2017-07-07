import { Component, OnInit } from '@angular/core';
import {TreeModule, TreeNode} from 'primeng/primeng';

@Component({
  selector: 'app-info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.css']
})
export class InfoListComponent implements OnInit {

  infoCategories: TreeNode[];
  constructor() {
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
          'label': '政策法规',
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
    }
    ];
  }

  ngOnInit() {
  }

}
