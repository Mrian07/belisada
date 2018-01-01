import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontNavComponent } from './front-nav.component';

describe('FrontNavComponent', () => {
  let component: FrontNavComponent;
  let fixture: ComponentFixture<FrontNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
