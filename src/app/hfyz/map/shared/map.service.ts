import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class MapService {
  change: EventEmitter<any>;

  constructor(){
    this.change = new EventEmitter();
  }
};
