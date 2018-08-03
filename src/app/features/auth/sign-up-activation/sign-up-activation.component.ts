import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { ActivationResponse, ActivationRequest, SendEmailRequest } from '@belisada/core/models';
import { UserService } from '@belisada/core/services';
import { JWTUtil } from '@belisada/core/util';
import { SendEmailTypeEnum } from '@belisada/core/enum';

@Component({
  selector: 'app-sign-up-activation',
  templateUrl: './sign-up-activation.component.html',
  styleUrls: ['./sign-up-activation.component.scss']
})
export class SignUpActivationComponent implements OnInit, OnDestroy {

  key: string;
  emailFC: FormControl;
  name: string;
  activationData;
  activationResponse: ActivationResponse = new ActivationResponse();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private jwtUtil: JWTUtil
  ) { }


  ngOnInit() {
    this.createForm();

    this.key = this.activatedRoute.snapshot.queryParamMap.get('key');
    console.log('ada key: ', this.key);
    const activationRequest: ActivationRequest = new ActivationRequest();
    activationRequest.key = this.key;
    this.userService.activation(activationRequest).subscribe(response => {
      
      if(response.status === 2){
        this.userService.setUserToLocalStorage(response.data.token);
        this.name = response.data.name;
        setTimeout(() => {
          this.router.navigateByUrl('/buyer/profile');
        } , 1500);
      }
      

      this.activationResponse = response;

      if (this.key !== null && this.activationResponse.status === 3) {
        this.activationData = this.jwtUtil.parseJwt(this.key);
        const data: SendEmailRequest = new SendEmailRequest();
        data.email = this.activationData.sub;
        data.type = SendEmailTypeEnum.ACTIVATION;
        this.userService.sendEmail(data).subscribe(result => {
          // DO SOMETHING HERE, AFTER SUCCESS FUCNTION
          },
          error => {});
      }
    },
    error => {
    });
  }

  ngOnDestroy(): void {
    location.reload();
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
      this.name = result.name;
    },
    error => {
      swal(
      'belisada.co.id',
      'Unknown error',
      'error'
      );
    });
  }

  createForm() {
    this.emailFC = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
    ]);
  }
}
