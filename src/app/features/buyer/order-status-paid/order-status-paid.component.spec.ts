import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusPaidComponent } from './order-status-paid.component';

describe('OrderStatusComponent', () => {
  let component: OrderStatusPaidComponent;
  let fixture: ComponentFixture<OrderStatusPaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusPaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
