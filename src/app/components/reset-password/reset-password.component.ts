import { UserService } from './../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswdRequest } from '../../core/services/user/models/user';

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
        private userService: UserService
    ) { }

    ngOnInit() {
        this.createForm();
        this.route.queryParams.subscribe( params => {
        this.data.key = params.key;
        });
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

    /*Fungsi ini untuk melakukan proses reset password*/
    onSubmit() {
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
