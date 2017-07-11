import {Component, OnDestroy} from '@angular/core';


@Component({
  selector: 'null-map',
  template: '<div>kongda....</div>'
})
export class NullMapComponent implements  OnDestroy{
  timer:any

  constructor() {
    var aaa=Math.random();
    this.timer=setInterval(() => {
      console.log(`NullMapComponent:${aaa}`)
    },1000);

  }

  ngOnDestroy() {
    console.log(`======NullMapComponent::::::==ngOnDestroy=============`);
    clearTimeout(this.timer);
  }
}
