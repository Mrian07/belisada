import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSalesStatusComponent } from './m-sales-status.component';

describe('MSalesStatusComponent', () => {
  let component: MSalesStatusComponent;
  let fixture: ComponentFixture<MSalesStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSalesStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSalesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
