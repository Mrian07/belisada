import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCenterComponent } from './seller-center.component';

describe('SellerCenterComponent', () => {
  let component: SellerCenterComponent;
  let fixture: ComponentFixture<SellerCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
