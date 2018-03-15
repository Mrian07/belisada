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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
