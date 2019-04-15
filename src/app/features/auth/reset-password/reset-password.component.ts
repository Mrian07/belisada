import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm, FormBuilder } from '@angular/forms';
import { ResetPasswdRequest } from '@belisada/core/models';
import { UserService } from '@belisada/core/services';
import { PasswordValidation } from '@belisada/shared/validators';
import { LoadingService } from '@belisada/core/services/globals/loading.service';
import { PARAMETERS } from '@angular/core/src/util/decorators';

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
    private userService: UserService,
    private _router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.queryParams.subscribe( params => {
      this.data.key = params.key;
      console.log('key', this.data.key);
    });
    if (typeof this.data.key === 'undefined') {
      this._router.navigateByUrl('/account/sign-in');
    } else if (this.data.key === '') {
      this._router.navigateByUrl('/');
    }
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

    this.loadingService.show();
    if (this.rstForm.valid) {
      this.data.newPassword = this.rstForm.value.password;
      this.userService.resetPasswd(this.data).subscribe(rsl => {
        this.loadingService.hide();
        this.msg = rsl.message;
        if (rsl.status === 1) {
          this.loadingService.hide();
          this.success = true;
          setTimeout(() => {
            this.router.navigateByUrl('/account/sign-in');
          }, 3000);
        }
      });
    }
  }
}
