import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SigninComponent } from '@belisada/features/auth';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [
        SigninComponent
    ],
    imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule
    ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('forms should contains email, password', () => {
    expect(component.signinFormGroup.controls['email']).toBeTruthy();
    expect(component.signinFormGroup.controls['password']).toBeTruthy();
  });

  it('email validation', () => {
    const email = component.signinFormGroup.controls['email'];

    email.setValue('');
    expect(email.valid).toBeFalsy();

    email.setValue('uname@hostname');
    expect(email.valid).toBeFalsy();

    email.setValue('uname.domain');
    expect(email.valid).toBeFalsy();
  });

  it('email password', () => {
    const control = component.signinFormGroup.controls['password'];

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });
});
