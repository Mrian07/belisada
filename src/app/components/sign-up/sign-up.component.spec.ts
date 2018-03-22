import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './../../core/services/user/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { RecaptchaModule, RecaptchaLoaderService } from 'ng-recaptcha';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        RecaptchaModule,
        RecaptchaFormsModule ],
      providers: [
        UserService,
        RecaptchaLoaderService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fullname validation', () => {
    const fullname = component.vForValidation.controls['fullname'];
    expect(fullname).toBeTruthy();
    fullname.setValue('');
    expect(fullname.valid).toBeFalsy();
  });

  it('email validation', () => {
    const control = component.vForValidation.controls['email'];
    expect(control).toBeTruthy();
    control.setValue('');
    expect(control.valid).toBeFalsy();
    control.setValue('tes');
    expect(control.valid).toBeFalsy();
    control.setValue('tes@tes');
    expect(control.valid).toBeFalsy();
    control.setValue('tes.tes');
    expect(control.valid).toBeFalsy();
  });

  it('password validation', () => {
    const control = component.vForValidation.controls['password'];
    expect(control).toBeTruthy();
    control.setValue('');
    expect(control.valid).toBeFalsy();
    control.setValue('123456');
    expect(control.valid).toBeFalsy();
  });

  it('password validation', () => {
    const control = component.vForValidation.controls['password'];
    expect(control).toBeTruthy();
    control.setValue('');
<<<<<<< HEAD
    expect(control.valid).toBeFalsy();
    control.setValue('123456');
=======
>>>>>>> fd3157aaebe092c1de833cf0604aba89d40c1eb7
    expect(control.valid).toBeFalsy();
    control.setValue('123456');
    expect(control.valid).toBeFalsy();
  });

  it('forms also contains confirmPassword, phoneNumber and recaptchaReactive', () => {
    expect(component.vForValidation.controls['confirmPassword']).toBeTruthy();
    expect(component.vForValidation.controls['phoneNumber']).toBeTruthy();
    expect(component.vForValidation.controls['recaptchaReactive']).toBeTruthy();
  });

  it('forms also contains confirmPassword, phoneNumber and recaptchaReactive', () => {
    expect(component.vForValidation.controls['confirmPassword']).toBeTruthy();
    expect(component.vForValidation.controls['phoneNumber']).toBeTruthy();
    expect(component.vForValidation.controls['recaptchaReactive']).toBeTruthy();
  });
});
