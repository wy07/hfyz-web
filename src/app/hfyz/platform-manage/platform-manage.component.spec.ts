import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformManageComponent } from './platform-manage.component';

describe('PlatformManageComponent', () => {
  let component: PlatformManageComponent;
  let fixture: ComponentFixture<PlatformManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
