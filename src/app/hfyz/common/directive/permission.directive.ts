import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { ConfigService } from './../../config/config.service';

// Directive decorator
@Directive({ selector: '[hasPermission]' })
// Directive class
export class PermissionDirective {
    @Input() hasPermission: string;
    rights: string;
    constructor(private _el: ElementRef
        , private _renderer: Renderer
        , private _configService: ConfigService) {
        this.rights = this._configService.getConfiguration().ROLE_RIGHTS;
    }
    ngOnInit() {
        let result = false
        if (this.rights == '*:*') {
            result = true
        } else {
            let targetRight = this.hasPermission.split(":")
            if (this.rights.indexOf(this.hasPermission) > -1) {
                result = true
            }
        }
        if (!result) {
            this._renderer.setElementStyle(this._el.nativeElement, 'display', 'none');
        }
    }
}