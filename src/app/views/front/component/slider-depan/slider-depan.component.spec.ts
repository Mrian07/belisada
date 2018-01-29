import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDepanComponent } from './slider-depan.component';

describe('SliderDepanComponent', () => {
  let component: SliderDepanComponent;
  let fixture: ComponentFixture<SliderDepanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderDepanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderDepanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
