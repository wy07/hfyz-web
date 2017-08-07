import {Directive, ElementRef, Renderer, Input, OnInit} from '@angular/core';
import {isUndefined} from "util";

@Directive({selector: '[hasPermission]'})
export class PermissionDirective implements OnInit {
    @Input() hasPermission: string;
    constructor(private _el: ElementRef
        , private _renderer: Renderer) {
    }

    ngOnInit() {
        if (!this.hasPermission) {
            return true
        }
        if (isUndefined(sessionStorage.getItem('rights'))) {
            return false;
        }
        const rights: any = sessionStorage.getItem('rights').split(';');
        const targetRight = this.hasPermission.split(';');
        const intersection = rights.filter(v => targetRight.indexOf(v) > -1);
        if (intersection.length > 0) {
            return true
        }

        this._renderer.setElementStyle(this._el.nativeElement, 'display', 'none');
    }
}
