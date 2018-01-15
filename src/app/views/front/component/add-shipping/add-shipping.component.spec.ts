import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingComponent } from './add-shipping.component';

describe('AddShippingComponent', () => {
  let component: AddShippingComponent;
  let fixture: ComponentFixture<AddShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
