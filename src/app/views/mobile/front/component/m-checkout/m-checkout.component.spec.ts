import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCheckoutComponent } from './m-checkout.component';

describe('MCheckoutComponent', () => {
  let component: MCheckoutComponent;
  let fixture: ComponentFixture<MCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
