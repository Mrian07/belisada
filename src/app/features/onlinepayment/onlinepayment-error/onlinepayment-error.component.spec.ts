import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinepaymentErrorComponent } from './onlinepayment-error.component';

describe('OnlinepaymentErrorComponent', () => {
  let component: OnlinepaymentErrorComponent;
  let fixture: ComponentFixture<OnlinepaymentErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinepaymentErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinepaymentErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
