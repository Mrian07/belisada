import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectReturComponent } from './reject-retur.component';

describe('RejectReturComponent', () => {
  let component: RejectReturComponent;
  let fixture: ComponentFixture<RejectReturComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectReturComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectReturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
