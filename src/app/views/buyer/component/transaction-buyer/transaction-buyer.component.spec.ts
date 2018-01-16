import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionBuyerComponent } from './transaction-buyer.component';

describe('TransactionBuyerComponent', () => {
  let component: TransactionBuyerComponent;
  let fixture: ComponentFixture<TransactionBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
