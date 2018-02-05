import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSellerCenterComponent } from './faq-seller-center.component';

describe('FaqSellerCenterComponent', () => {
  let component: FaqSellerCenterComponent;
  let fixture: ComponentFixture<FaqSellerCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqSellerCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqSellerCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
