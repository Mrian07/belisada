import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MFinishOrderComponent } from './m-finish-order.component';

describe('MFinishOrderComponent', () => {
  let component: MFinishOrderComponent;
  let fixture: ComponentFixture<MFinishOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MFinishOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MFinishOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
