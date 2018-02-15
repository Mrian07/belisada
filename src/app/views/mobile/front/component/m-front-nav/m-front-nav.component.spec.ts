import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MFrontNavComponent } from './m-front-nav.component';

describe('MFrontNavComponent', () => {
  let component: MFrontNavComponent;
  let fixture: ComponentFixture<MFrontNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MFrontNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MFrontNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
