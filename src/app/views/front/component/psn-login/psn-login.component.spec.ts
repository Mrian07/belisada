import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsnLoginComponent } from './psn-login.component';

describe('PsnLoginComponent', () => {
  let component: PsnLoginComponent;
  let fixture: ComponentFixture<PsnLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsnLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsnLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
