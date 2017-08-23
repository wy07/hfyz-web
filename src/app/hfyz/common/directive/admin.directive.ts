import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({ selector: '[isAdmin]' })
export class AdminDirective implements OnInit {

    constructor(private _el: ElementRef
        , private _renderer: Renderer) {
    }

    ngOnInit() {
        const isShowAdminInfo = sessionStorage.getItem('orgId') === 'null'
        if (isShowAdminInfo) {
            this._renderer.setElementStyle(this._el.nativeElement, 'display', 'block');
        } else {
            this._renderer.setElementStyle(this._el.nativeElement, 'display', 'none');
        }
    }
}
