import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTopBuyerComponent } from './product-top-buyer.component';

describe('ProductTopBuyerComponent', () => {
  let component: ProductTopBuyerComponent;
  let fixture: ComponentFixture<ProductTopBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTopBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTopBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
