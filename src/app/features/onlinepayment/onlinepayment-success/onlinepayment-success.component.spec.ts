import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinepaymentSuccessComponent } from './onlinepayment-success.component';

describe('OnlinepaymentSuccessComponent', () => {
  let component: OnlinepaymentSuccessComponent;
  let fixture: ComponentFixture<OnlinepaymentSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinepaymentSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinepaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
