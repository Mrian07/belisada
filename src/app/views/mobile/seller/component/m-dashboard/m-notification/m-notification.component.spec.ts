import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MNotificationComponent } from './m-notification.component';

describe('MNotificationComponent', () => {
  let component: MNotificationComponent;
  let fixture: ComponentFixture<MNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
