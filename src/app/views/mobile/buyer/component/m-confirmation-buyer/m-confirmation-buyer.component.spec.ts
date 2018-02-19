import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MConfirmationBuyerComponent } from './m-confirmation-buyer.component';

describe('MConfirmationBuyerComponent', () => {
  let component: MConfirmationBuyerComponent;
  let fixture: ComponentFixture<MConfirmationBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MConfirmationBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MConfirmationBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
