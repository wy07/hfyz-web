import {Component, OnInit} from '@angular/core';
import {TreeModule, TreeNode} from 'primeng/primeng';

@Component({
  selector: 'app-info-check',
  templateUrl: './info-check.component.html',
  styleUrls: ['./info-check.component.css']
})
export class InfoCheckComponent implements OnInit {
  categories: TreeNode[];

  constructor() {
    this.categories = [{
      'label': '审核信息分类',
      'data': 'Documents Folder',
      'expanded': true,
      'expandedIcon': 'fa-minus-square-o',
      'collapsedIcon': 'fa-plus-square-o',
      'children': [{
        'label': '待审核',
        'expandedIcon': 'fa-folder-open',
        'collapsedIcon': 'fa-minus',
      },
        {
          'label': '已审核',
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-minus'
        },
        {
          'label': '不通过',
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-minus'
        }]
    }
    ];
    window.console.log(this.categories);
  }

  ngOnInit() {
  }

}
