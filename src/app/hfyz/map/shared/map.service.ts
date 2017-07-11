import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class MapService {
  change: EventEmitter<string>;
  i:number = 0;

  constructor(){
    this.change = new EventEmitter();
  }
};
