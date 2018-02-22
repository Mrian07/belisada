import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAboutUsComponent } from './m-about-us.component';

describe('MAboutUsComponent', () => {
  let component: MAboutUsComponent;
  let fixture: ComponentFixture<MAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
