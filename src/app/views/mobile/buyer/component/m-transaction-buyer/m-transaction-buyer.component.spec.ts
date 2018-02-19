import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTransactionBuyerComponent } from './m-transaction-buyer.component';

describe('MTransactionBuyerComponent', () => {
  let component: MTransactionBuyerComponent;
  let fixture: ComponentFixture<MTransactionBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTransactionBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTransactionBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
