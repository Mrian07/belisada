import { UserService } from './../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivationRequest, ActivationResponse, UserData, SendEmailRequest } from '../../core/services/user/models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { JWTUtil } from '../../core/util/jwt.util';
import swal from 'sweetalert2';
import { SendEmailTypeEnum } from '../../core/enum/send-email-type.enum';

@Component({
    selector: 'app-sign-up-activation',
    templateUrl: './sign-up-activation.component.html',
    styleUrls: ['./sign-up-activation.component.scss']
})
export class SignUpActivationComponent implements OnInit {

    key: string;
    emailFC: FormControl;
    activationData;
    activationResponse: ActivationResponse = new ActivationResponse();

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private fb: FormBuilder,
        private jwtUtil: JWTUtil
    ) {

    }

    ngOnInit() {
        this.createForm();

        this.key = this.activatedRoute.snapshot.queryParamMap.get('key');
        console.log('this.key: ', this.key);
        const activationRequest: ActivationRequest = new ActivationRequest();
        activationRequest.key = this.key;
        this.userService.activation(activationRequest).subscribe(
        response => {
            this.activationResponse = response;

            if (this.key !== null && this.activationResponse.status === 3) {
            this.activationData = this.jwtUtil.parseJwt(this.key);
            const data: SendEmailRequest = new SendEmailRequest();
            data.email = this.activationData.sub;
            data.type = SendEmailTypeEnum.ACTIVATION;
            this.userService.sendEmail(data).subscribe(
                result => {
                // DO SOMETHING HERE, AFTER SUCCESS FUCNTION
                },
                error => {
                }
            );
            }
        },
        error => {
        }
        );
    }

    onSubmit() {
        const data: SendEmailRequest = new SendEmailRequest();
        data.email = this.emailFC.value;
        data.type = SendEmailTypeEnum.ACTIVATION;
        this.userService.sendEmail(data).subscribe(
        result => {
            swal(
            'belisada.co.id',
            result.message,
            (result.status === 0) ? 'error' : 'success'
            );
            this.emailFC.reset();
        },
        error => {
            swal(
            'belisada.co.id',
            'Unknown error',
            'error'
            );
        }
        );
    }

    createForm() {
        this.emailFC = new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
        ]);
    }
}
