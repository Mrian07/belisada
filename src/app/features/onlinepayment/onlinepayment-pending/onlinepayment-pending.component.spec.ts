import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinepaymentPendingComponent } from './onlinepayment-pending.component';

describe('OnlinepaymentPendingComponent', () => {
  let component: OnlinepaymentPendingComponent;
  let fixture: ComponentFixture<OnlinepaymentPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinepaymentPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinepaymentPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
