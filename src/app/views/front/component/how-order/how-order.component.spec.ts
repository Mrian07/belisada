import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowOrderComponent } from './how-order.component';

describe('HowOrderComponent', () => {
  let component: HowOrderComponent;
  let fixture: ComponentFixture<HowOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
