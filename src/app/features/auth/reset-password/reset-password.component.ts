import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm, FormBuilder } from '@angular/forms';
import { ResetPasswdRequest } from '@belisada/core/models';
import { UserService } from '@belisada/core/services';
import { PasswordValidation } from '@belisada/shared/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  rstForm: FormGroup;
  data: ResetPasswdRequest = new ResetPasswdRequest;
  msg: string;
  success: boolean;
  field_form: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.queryParams.subscribe( params => {
      this.data.key = params.key;
    });
  }

  createForm() {
    this.rstForm = this.fb.group({
      password: new FormControl('', [
          Validators.required,
          Validators.minLength(7)
      ]),
      confirmPassword: new FormControl('', [
          Validators.required
      ]),
  }, {
      validator: PasswordValidation.MatchPassword,
      updateOn: 'blur'
  });
    // this.rstForm = this.fb.group({
    //   password: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(7)
    // ]),
    // password_repeat: new FormControl('', [
    //   Validators.required
    // ]),
    // }, (fg: FormGroup) => {
    //   return fg.get('password').value === fg.get('password_repeat').value ? null : {'mismatch': true};
    // });
  }

  /*Fungsi ini untuk melakukan proses reset password*/
  onSubmit(form: NgForm) {
    console.log(form);
    if (this.rstForm.valid) {
      this.data.newPassword = this.rstForm.value.password;
      this.userService.resetPasswd(this.data).subscribe(rsl => {
        this.msg = rsl.message;
        if (rsl.status === 1) {
          this.success = true;
        }
      });
    }
  }
}
