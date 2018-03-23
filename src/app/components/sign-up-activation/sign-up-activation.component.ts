import { UserService } from './../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivationRequest } from '../../core/services/user/models/user';

@Component({
  selector: 'app-sign-up-activation',
  templateUrl: './sign-up-activation.component.html',
  styleUrls: ['./sign-up-activation.component.scss']
})
export class SignUpActivationComponent implements OnInit {

  key: string;
  status: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.key = this.activatedRoute.snapshot.queryParamMap.get('key');
    console.log('this.key: ', this.key);
    const activationRequest: ActivationRequest = new ActivationRequest();
    activationRequest.key = this.key;
    this.userService.activation(activationRequest).subscribe(
      response => {
        console.log('response: ', response.status);
        this.status = response.status;
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  reActivation() {
    //alert('sssss');
    this.status = 4;
  }
}
