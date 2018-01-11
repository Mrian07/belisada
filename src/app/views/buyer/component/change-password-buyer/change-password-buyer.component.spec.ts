import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordBuyerComponent } from './change-password-buyer.component';

describe('ChangePasswordBuyerComponent', () => {
  let component: ChangePasswordBuyerComponent;
  let fixture: ComponentFixture<ChangePasswordBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
