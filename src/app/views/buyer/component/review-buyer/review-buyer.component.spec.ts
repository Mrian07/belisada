import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBuyerComponent } from './review-buyer.component';

describe('ReviewBuyerComponent', () => {
  let component: ReviewBuyerComponent;
  let fixture: ComponentFixture<ReviewBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
