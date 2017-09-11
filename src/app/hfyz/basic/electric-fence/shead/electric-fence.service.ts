import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class ElectricFenceService {
    area: any;
    constructor(public restangular: Restangular) {
    }

    search(name) {
        return this.restangular.all('electric-fences').customGET('search', {
            name: name
        })
    }


    save(name, coordinates) {
        return this.restangular.one('electric-fences').customPOST({name: name, coordinates: coordinates}, 'save');
    }
}
