import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinihOrderComponent } from './finih-order.component';

describe('FinihOrderComponent', () => {
  let component: FinihOrderComponent;
  let fixture: ComponentFixture<FinihOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinihOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinihOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
