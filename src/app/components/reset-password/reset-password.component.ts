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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
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
    // return console.log(this.rstForm);
    this.data.newPassword = this.rstForm.value.password;
    this.userService.resetPasswd(this.data).subscribe(rsl => {
      console.log('resp reset pswd:', rsl);
      alert(rsl.message);
    });
  }

  loadData() {
    this.route.params.subscribe( params => {
      this.data.key = params.id;
      // console.log(params.id);
    });
  }

}
