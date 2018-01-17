import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSellerComponent } from './faq-seller.component';

describe('FaqSellerComponent', () => {
  let component: FaqSellerComponent;
  let fixture: ComponentFixture<FaqSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
