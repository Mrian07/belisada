import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSliderDepanComponent } from './m-slider-depan.component';

describe('MSliderDepanComponent', () => {
  let component: MSliderDepanComponent;
  let fixture: ComponentFixture<MSliderDepanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSliderDepanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSliderDepanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
