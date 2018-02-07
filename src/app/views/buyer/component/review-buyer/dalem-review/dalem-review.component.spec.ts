import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DalemReviewComponent } from './dalem-review.component';

describe('DalemReviewComponent', () => {
  let component: DalemReviewComponent;
  let fixture: ComponentFixture<DalemReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DalemReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DalemReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
