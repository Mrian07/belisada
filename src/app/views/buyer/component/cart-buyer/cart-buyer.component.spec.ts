import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBuyerComponent } from './cart-buyer.component';

describe('CartBuyerComponent', () => {
  let component: CartBuyerComponent;
  let fixture: ComponentFixture<CartBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
