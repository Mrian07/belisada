import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MBillingAddressComponent } from './m-billing-address.component';

describe('MBillingAddressComponent', () => {
  let component: MBillingAddressComponent;
  let fixture: ComponentFixture<MBillingAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MBillingAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MBillingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
