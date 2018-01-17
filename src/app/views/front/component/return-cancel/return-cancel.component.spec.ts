import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCancelComponent } from './return-cancel.component';

describe('ReturnCancelComponent', () => {
  let component: ReturnCancelComponent;
  let fixture: ComponentFixture<ReturnCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
