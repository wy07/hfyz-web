import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class ElectricFenceService {
    area: any;
    constructor(public restangular: Restangular) {
    }

    search(name, max, offset) {
        return this.restangular.all('electric-fences').customGET('search', {
            name: name,
            max: max,
            offset: offset
        })
    }

    save(name, coordinates) {
        return this.restangular.one('electric-fences').customPOST({ name: name, coordinates: coordinates }, 'save');
    }

    delete(id) {
        return this.restangular.one('electric-fences', id).customDELETE('delete', {});
    }

    show(id) {
        return this.restangular.one('electric-fences', id).customGET('show', {});
    }

    edit(id) {
        return this.restangular.one('electric-fences', id).customGET('edit', {});
    }

    update(id, name, coordinates) {
        return this.restangular.one('electric-fences', id).customPOST({ name: name, coordinates: coordinates }, 'update');
    }
}
