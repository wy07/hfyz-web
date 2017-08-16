import { Directive, ElementRef, Renderer, Input, OnInit, AfterViewChecked } from '@angular/core';

@Directive({ selector: '[autoHeight]' })
export class AutoHeightDirective implements OnInit, AfterViewChecked {

    @Input() ratio: number;
    @Input() offset: number;

    constructor(private _el: ElementRef
        , private _renderer: Renderer) {
    }

    ngOnInit() {
        const winowHeight = window.innerHeight;
        sessionStorage.setItem('winowHeight', winowHeight.toString());
        const headerHeight = 100;
        const footerHeight = 50;
        const height = (winowHeight - headerHeight - footerHeight) * this.ratio / 100 + this.offset;
        this._renderer.setElementStyle(this._el.nativeElement, 'height', height + 'px');
    }

    ngAfterViewChecked() {
        const oldHeight = sessionStorage.getItem('winowHeight')
        if (oldHeight !== window.innerHeight.toString()) {
            console.log('=====in====ngAfterViewChecked==')
            const winowHeight = window.innerHeight;
            sessionStorage.setItem('winowHeight', winowHeight.toString());
            const headerHeight = 100;
            const footerHeight = 50;
            const height = (winowHeight - headerHeight - footerHeight) * this.ratio / 100 + this.offset;
            this._renderer.setElementStyle(this._el.nativeElement, 'height', height + 'px');
        }
    }
}


