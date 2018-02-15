import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MShippingAddressComponent } from './m-shipping-address.component';

describe('MShippingAddressComponent', () => {
  let component: MShippingAddressComponent;
  let fixture: ComponentFixture<MShippingAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MShippingAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
