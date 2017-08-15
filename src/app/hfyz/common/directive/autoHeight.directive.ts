import {Directive, ElementRef, Renderer, Input, OnInit} from '@angular/core';

@Directive({selector: '[autoHeight]'})
export class AutoHeightDirective implements OnInit {

    @Input() ratio: number;
    @Input() offset: number;

    constructor(private _el: ElementRef
        , private _renderer: Renderer) {
    }

    ngOnInit() {
        let winowHeight=window.innerHeight;
        let headerHeight = 100;
        let footerHeight = 50;

        let height=(winowHeight-headerHeight-footerHeight)*this.ratio/100+this.offset;

        this._renderer.setElementStyle(this._el.nativeElement, 'height', height + 'px');
    }
}


