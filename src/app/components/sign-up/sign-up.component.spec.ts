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

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('forms should contains firstName, password, confirmPassword, email, recaptchaReactive', () => {
    expect(component.vForValidation.controls['firstName']).toBeTruthy();
    expect(component.vForValidation.controls['password']).toBeTruthy();
    expect(component.vForValidation.controls['confirmPassword']).toBeTruthy();
    expect(component.vForValidation.controls['email']).toBeTruthy();
    expect(component.vForValidation.controls['phoneNumber']).toBeTruthy();
    expect(component.vForValidation.controls['recaptchaReactive']).toBeTruthy();
  });

  it('firstName validation', () => {
    let control = component.vForValidation.controls['firstName'];

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });
});
