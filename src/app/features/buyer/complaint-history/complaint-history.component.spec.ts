import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintHistoryComponent } from './complaint-history.component';

describe('ComplaintHistoryComponent', () => {
  let component: ComplaintHistoryComponent;
  let fixture: ComponentFixture<ComplaintHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
