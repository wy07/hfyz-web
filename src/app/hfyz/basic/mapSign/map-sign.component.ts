import { RegularService } from './../../common/shared/regular.service';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MapSignService } from './shared/map-sign.service';
import DateTimeFormat = Intl.DateTimeFormat;
import {DatePipe} from '@angular/common';

@Component({
  selector: 'map-sign',
  templateUrl: 'map-sign.component.html',
  styleUrls: ['map-sign.component.css']
})

export class MapSignComponent implements OnInit {
  mapSignList: any;
  currentPage: number;
  max: any;
  total: any;
  displayList: any;
  constructor(private _router: Router
    , private _activatedRoute: ActivatedRoute
    , private _toastr: ToastsManager
    , private _regularService: RegularService
    , private _mapSignService: MapSignService
    , private datePipe: DatePipe
  ) {
    this.mapSignList = [];
    this.max = 10;
    this.total = 0;
    this.displayList = [];
    this.displayList.push({ label: '显示', value: 'true' });
    this.displayList.push({ label: '隐藏', value: 'false'});
  }

  ngOnInit() {
    this.initData();
  }
  initData(offset = 0) {
    this._mapSignService.list(this.max, offset).subscribe(
      res => {
        this.mapSignList = res.mapSignList;
        this.total = res.total;
      }
    );
  }

  delete(mapSign) {
    if (confirm('确认删除"' + mapSign.name + '"路标？')) {
      this._mapSignService.delete(mapSign.id).subscribe(
        res => {
          this.initData();
          this._toastr.info(`删除成功`);
        }
      );
    }
  }
  changeDisplay(mapSign) {
    if (confirm('确认修改"' + mapSign.name + '"路标状态？')) {
      this._mapSignService.changeDisplay(mapSign.id, mapSign.display === '显示' ? false : true).subscribe(
        res => {
          this.initData();
          this._toastr.info(`修改成功`);
        }
      );
    }
  }

  paginate(event) {
    if (this.currentPage !== event.page) {
      this.currentPage = event.page;
      this.initData(this.max * event.page);
    }
  }
}
