import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRealTimeMapComponent } from './car-real-time-map.component';

describe('CarRealTimeMapComponent', () => {
  let component: CarRealTimeMapComponent;
  let fixture: ComponentFixture<CarRealTimeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRealTimeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRealTimeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
