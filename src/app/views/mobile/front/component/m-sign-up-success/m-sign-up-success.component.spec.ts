import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSignUpSuccessComponent } from './m-sign-up-success.component';

describe('MSignUpSuccessComponent', () => {
  let component: MSignUpSuccessComponent;
  let fixture: ComponentFixture<MSignUpSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSignUpSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSignUpSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
