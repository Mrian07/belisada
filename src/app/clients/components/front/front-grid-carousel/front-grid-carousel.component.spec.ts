import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontGridCarouselComponent } from './front-grid-carousel.component';

describe('FrontGridCarouselComponent', () => {
  let component: FrontGridCarouselComponent;
  let fixture: ComponentFixture<FrontGridCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontGridCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontGridCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
