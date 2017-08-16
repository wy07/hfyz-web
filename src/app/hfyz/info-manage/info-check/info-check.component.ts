import {Component, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {zh} from "../../common/shared/zh";

@Component({
  selector: 'app-info-check',
  templateUrl: './info-check.component.html',
  styleUrls: ['./info-check.component.css']
})
export class InfoCheckComponent implements OnInit {
  categories: TreeNode[];
  dataSource: any;
  zh = zh;
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
    this.dataSource = [{'id': 1, 'regular': '政策法规', 'regularName': '中华人民共和国行政诉讼法',
        'time': '2017-07-03 10:04:16', 'name': '王敏', 'status': '待审核'},
        {'id': 2, 'regular': '标准', 'regularName': '机动车维修规定',
            'time': '2017-07-07 10:24:36', 'name': '王敏', 'status': '待审核'},

    ]
  }

  ngOnInit() {
  }

}
