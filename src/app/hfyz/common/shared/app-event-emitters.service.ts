import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AppEventEmittersService {
    tabChange: EventEmitter<any>;

    constructor() {
        this.tabChange = new EventEmitter();
    }
}
