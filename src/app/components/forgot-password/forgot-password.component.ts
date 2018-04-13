import { SendEmailRequest } from './../../core/services/user/models/user';
import { UserService } from './../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import swal from 'sweetalert2';
import { SendEmailTypeEnum } from '../../core/enum/send-email-type.enum';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
    email: FormControl;
    success: boolean;
    msg: string;

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.success = false;

        this.email = new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
        ]);
    }

    /*Fungsi untuk melakukan request reset password dengan memasukan email terdaftar*/
    onSubmit() {
        if (this.email.valid) {
        delete this.msg;
        const data: SendEmailRequest = new SendEmailRequest();
        data.email = this.email.value;
        data.type = SendEmailTypeEnum.RESET_PASSWORD;
        this.userService.sendEmail(data).subscribe(rsl => {
                if (rsl.status === 1) {
                this.success = true;
                } else {
                this.msg = rsl.message;
                }
            });
        }
    }

}
