import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {RealTimeMapComponent} from "./real-time-map.component";

describe('RealTimeMapComponent', () => {
  let component: RealTimeMapComponent;
  let fixture: ComponentFixture<RealTimeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
