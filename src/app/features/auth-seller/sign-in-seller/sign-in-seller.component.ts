import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';
import { EmailChecking, SigninRequest } from '@belisada/core/models';
import { UserService } from '@belisada/core/services';

@Component({
  selector: 'app-sign-in-seller',
  templateUrl: './sign-in-seller.component.html',
  styleUrls: ['./sign-in-seller.component.scss']
})
export class SignInSellerComponent implements OnInit {

  /* Mendeklarasikan nama variable*/
  signinFormGroup: FormGroup;
  formSubmited: Boolean = false;
  msg: string;
  emailChecking: EmailChecking = new EmailChecking();
  message: string;
  status: number;
  emailInvalid: number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createFormControl();
  }

  /* Fungsi untuk membuat nama field pada form */
  createFormControl() {
    this.signinFormGroup = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      password: ['', Validators.required]
    });
  }

  /* Fungsi ini untuk melakukan input data sign in dengan melakukan validasi pengecekan email, password */
  onSubmit() {
    const form = this.signinFormGroup;
    this.formSubmited = true;
    if (form.valid) {
      const signinRequest: SigninRequest = form.value;
      this.userService.signin(signinRequest).subscribe(
      result => {
        // Handle result
        if (result.status === 0) {
          this.msg = result.message;
        } else {
          const token: string = result.token;
          this.userService.setUserToLocalStorage(token);
          this.router.navigate(['/seller']);
        }
      }, error => {
        swal('belisada.co.id', 'unknown error', 'error');
      });
      this.formSubmited = false;
      form.reset();
      form.patchValue({email: signinRequest.email});
    }
  }

  /*Fungsi ini untuk berpindah halaman sign up jika user ingin melakukan pendaftaran*/
  goHome() {
    this.router.navigateByUrl('/');
  }

  /* Fungsi ini untuk melakukan pengecekan email valid*/
  onSearchChange(searchValue: string) {
    const modelz = this.signinFormGroup.value;
    this.emailChecking.email = modelz.email,
    this.userService.checkEmail(this.emailChecking)
    .subscribe(
      data => {
        this.message = data.message;
        this.status = data.status;
        if (data.status === 1) {
          this.emailInvalid = 0;
        } else {
          this.emailInvalid = 1;
        }
      },
      error => {
          console.log('error', error);
      });
  }


}
