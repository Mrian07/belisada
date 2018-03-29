import { UserService } from './../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivationRequest, ActivationResponse, UserData } from '../../core/services/user/models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { JWTUtil } from '../../core/util/jwt.util';

@Component({
  selector: 'app-sign-up-activation',
  templateUrl: './sign-up-activation.component.html',
  styleUrls: ['./sign-up-activation.component.scss']
})
export class SignUpActivationComponent implements OnInit {

  key: string;
  activationData: UserData;
  resendEmailFormGroup: FormGroup;
  activationResponse: ActivationResponse = new ActivationResponse();

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private jwtUtil: JWTUtil
  ) {

  }

  ngOnInit() {
    this.createForm();

    this.key = this.activatedRoute.snapshot.queryParamMap.get('key');
    this.activationData = this.jwtUtil.parseJwt(this.key);
    console.log('this.key: ', this.key);
    const activationRequest: ActivationRequest = new ActivationRequest();
    activationRequest.key = this.key;
    this.userService.activation(activationRequest).subscribe(
      response => {
        this.activationResponse = response;
        console.log('response: ', response.status);
        // this.status = response.status;
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  onSubmit() {
    // console.log('this.signinFormGroup: ', this.signinFormGroup);
    // const signinRequest: SigninRequest = this.signinFormGroup.value;
    // this.userService.signin(signinRequest).subscribe(
    //   result => {
    //     // Handle result
    //     console.log(result);
    //     if (result.status === 0) {
    //       swal(
    //         'belisada.co.id',
    //         result.message,
    //         'warning'
    //       );
    //     } else {
    //       const token: string = result.token;
    //       console.log('userData: ', this.userService.getUserData(token));
    //       this.userService.setUserToLocalStorage(token);
    //       this.router.navigate(['/']);
    //     }
    //   },
    //   error => {
    //     swal('belisada.co.id', 'unknown error', 'error');
    //     console.log(error);
    //   }
    // );
  }

  createForm() {
    this.resendEmailFormGroup = this.fb.group({
      email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ])
    });
  }

  // reActivation() {
    // this.status = 4;
  // }
}
