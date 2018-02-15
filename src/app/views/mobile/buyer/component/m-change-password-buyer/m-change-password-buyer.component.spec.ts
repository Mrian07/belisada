import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MChangePasswordBuyerComponent } from './m-change-password-buyer.component';

describe('MChangePasswordBuyerComponent', () => {
  let component: MChangePasswordBuyerComponent;
  let fixture: ComponentFixture<MChangePasswordBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MChangePasswordBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MChangePasswordBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
