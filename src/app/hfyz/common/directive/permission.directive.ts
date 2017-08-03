import {Directive, ElementRef, Renderer, Input, OnInit} from '@angular/core';
import {ConfigService} from './../../config/config.service';
import {isUndefined} from "util";

// Directive decorator
@Directive({selector: '[hasPermission]'})
// Directive class
export class PermissionDirective implements OnInit {
  @Input() hasPermission: string;
  rights: any;

  constructor(private _el: ElementRef
    , private _renderer: Renderer
    , private _configService: ConfigService) {
    this.rights = this._configService.getConfiguration().ROLE_RIGHTS;
  }

  ngOnInit() {
    let result = false
    console.log("============PermissionDirective")
    console.log(this.rights)
    console.log(this.hasPermission)
    if (!this.hasPermission) {
      return true
    }

    // if(this.rights === '*:*'){
    //   return true
    // }

    const targetRight = this.hasPermission.split(';');

    console.log('---1')

    if(isUndefined(this.rights)){
      return true;//应该return false 纯为调试方便 重载后 登录获取的权限木有了！！！
    }

    // this.rights = this.rights ? this.rights : [];
    let bSet = new Set(targetRight)
    console.log(Array.from(new Set(this.rights.filter(v => bSet.has(v)))))
    console.log(Array.from(new Set(this.rights.filter(v => bSet.has(v)))))
    console.log('---2')

    if (this.arrayIntersection(this.rights, targetRight).length > 0) {
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
