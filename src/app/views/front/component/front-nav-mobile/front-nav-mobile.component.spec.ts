import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontNavMobileComponent } from './front-nav-mobile.component';

describe('FrontNavMobileComponent', () => {
  let component: FrontNavMobileComponent;
  let fixture: ComponentFixture<FrontNavMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontNavMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontNavMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
