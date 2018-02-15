import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MFrontSlideShowComponent } from './m-front-slide-show.component';

describe('MFrontSlideShowComponent', () => {
  let component: MFrontSlideShowComponent;
  let fixture: ComponentFixture<MFrontSlideShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MFrontSlideShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MFrontSlideShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
