import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MReturnCancelComponent } from './m-return-cancel.component';

describe('MReturnCancelComponent', () => {
  let component: MReturnCancelComponent;
  let fixture: ComponentFixture<MReturnCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MReturnCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MReturnCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
