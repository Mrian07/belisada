import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationBuyerComponent } from './confirmation-buyer.component';

describe('ConfirmationBuyerComponent', () => {
  let component: ConfirmationBuyerComponent;
  let fixture: ComponentFixture<ConfirmationBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
