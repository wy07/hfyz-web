import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';
import { isUndefined } from 'util';

@Directive({ selector: '[isCompanyUser]' })
export class CompanyUserDirective implements OnInit {

    constructor(private _el: ElementRef
        , private _renderer: Renderer) {
    }

    ngOnInit() {
        const isShowCompanyInfo = sessionStorage.getItem('companyCode') === 'null'
        if (isShowCompanyInfo) {
            this._renderer.setElementStyle(this._el.nativeElement, 'display', 'block');
        }else {
            this._renderer.setElementStyle(this._el.nativeElement, 'display', 'none');
        }
        // let rights: any = [];
        // if (!isUndefined(sessionStorage.getItem('rights'))) {
        //     rights = sessionStorage.getItem('rights').split(';');
        // }
        // const targetRight = this.hasPermission.split(';');
        // const intersection = rights.filter(v => targetRight.indexOf(v) > -1);
        // if (intersection.length > 0) {
        //     return true;
        // }

        // this._renderer.setElementStyle(this._el.nativeElement, 'display', 'none');
    }
}
