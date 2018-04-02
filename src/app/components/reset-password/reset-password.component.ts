import { UserService } from './../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswdRequest } from '../../core/services/user/models/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  // styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  rstForm: FormGroup;
  data: ResetPasswdRequest = new ResetPasswdRequest;
  alert: boolean;
  msg: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.alert = false;
    this.createForm();
    this.loadData();
  }

  createForm() {
    this.rstForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7)
      ]),
      password_repeat: new FormControl('', [
          Validators.required
      ]),
    }, (fg: FormGroup) => {
      return fg.get('password').value === fg.get('password_repeat').value ? null : {'mismatch': true};
    });
  }

  onSubmit() {
    if (this.rstForm.value.password === '') {
      this.alert = true;
      this.msg = 'Password baru tidak boleh kosong.';
    } else if (this.rstForm.value.password_repeat === '') {
      this.alert = true;
      this.msg = 'Ulangi password baru tidak boleh kosong.';
    } else {
      this.data.newPassword = this.rstForm.value.password;
      this.userService.resetPasswd(this.data).subscribe(rsl => {


        console.log(rsl);

        if (rsl.status === 4) {
          this.alert = true;
          this.msg = 'Key sudah tidak berlaku';
        }
      });
    }
  }

  loadData() {
    this.route.params.subscribe( params => {
      this.data.key = params.id;
      // console.log(params.id);
    });
  }

}
