import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipingAddressComponent } from './shiping-address.component';

describe('ShipingAddressComponent', () => {
  let component: ShipingAddressComponent;
  let fixture: ComponentFixture<ShipingAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipingAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
