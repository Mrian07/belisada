import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusAllComponent } from './order-status-all.component';

describe('OrderStatusAllComponent', () => {
  let component: OrderStatusAllComponent;
  let fixture: ComponentFixture<OrderStatusAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
