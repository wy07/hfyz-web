import {Directive, ElementRef, Renderer, Input, OnInit} from '@angular/core';
import {ConfigService} from './../../config/config.service';
import {isUndefined} from "util";

// Directive decorator
@Directive({selector: '[hasPermission]'})
// Directive class
export class PermissionDirective implements OnInit {
  @Input() hasPermission: string;
  // rights: any;

  constructor(private _el: ElementRef
    , private _renderer: Renderer
    , private _configService: ConfigService) {


    // this.rights=;
    // this.rights = this._configService.getConfiguration().ROLE_RIGHTS;
  }

  ngOnInit() {
    if (!this.hasPermission) {
      return true
    }

    // if(this.rights === '*:*'){
    //   return true
    // }

    const targetRight = this.hasPermission.split(';');

    if(isUndefined(sessionStorage.getItem('rights'))){
      // this.rights=[];
      return true;//应该return false 纯为调试方便 重载后 登录获取的权限木有了！！！
    }
    let rights:any=sessionStorage.getItem('rights').split(';');
    // this.rights = this.rights ? this.rights : [];
    let bSet = new Set(targetRight)

    if (this.arrayIntersection(rights, targetRight).length > 0) {
      return true
    }

    this._renderer.setElementStyle(this._el.nativeElement, 'display', 'none')

    //
    // if (this.rights === '*:*') {
    //
    //     result = true
    // } else {
    //
    // }
    // if (!result) {
    //     // this._renderer.setElementStyle(this._el.nativeElement, 'display', 'none');
    // }
  }

  arrayIntersection(a, b) {
    var ai = 0, bi = 0;
    var result = new Array();
    while (ai < a.length && bi < b.length) {
      if (a[ai] < b[bi]) {
        ai++;
      }
      else if (a[ai] > b[bi]) {
        bi++;
      }
      else /* they're equal */
      {
        result.push(a[ai]);
        ai++;
        bi++;
      }
    }
    return result;
  }
}
;
