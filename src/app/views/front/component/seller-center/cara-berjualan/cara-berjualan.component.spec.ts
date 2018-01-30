import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaraBerjualanComponent } from './cara-berjualan.component';

describe('CaraBerjualanComponent', () => {
  let component: CaraBerjualanComponent;
  let fixture: ComponentFixture<CaraBerjualanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaraBerjualanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaraBerjualanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
