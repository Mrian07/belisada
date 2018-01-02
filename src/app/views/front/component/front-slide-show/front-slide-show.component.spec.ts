import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontSlideShowComponent } from './front-slide-show.component';

describe('FrontSlideShowComponent', () => {
  let component: FrontSlideShowComponent;
  let fixture: ComponentFixture<FrontSlideShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontSlideShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontSlideShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
