import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSignUpComponent } from './m-sign-up.component';

describe('MSignUpComponent', () => {
  let component: MSignUpComponent;
  let fixture: ComponentFixture<MSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
