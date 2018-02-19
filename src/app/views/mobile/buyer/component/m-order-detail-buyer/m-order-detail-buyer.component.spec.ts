import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MOrderDetailBuyerComponent } from './m-order-detail-buyer.component';

describe('MOrderDetailBuyerComponent', () => {
  let component: MOrderDetailBuyerComponent;
  let fixture: ComponentFixture<MOrderDetailBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MOrderDetailBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MOrderDetailBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
