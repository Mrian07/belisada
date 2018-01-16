import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailBuyerComponent } from './order-detail-buyer.component';

describe('OrderDetailBuyerComponent', () => {
  let component: OrderDetailBuyerComponent;
  let fixture: ComponentFixture<OrderDetailBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
