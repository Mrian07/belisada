import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubscribeService } from '../../../core/services/subscribe/subscribe.service';
import swal from 'sweetalert2';
import { SubscribeRequest } from '../../../core/services/subscribe/model/subscribe-m';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  // styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  fGroupFooter: FormGroup;
  subcribeRequest: SubscribeRequest = new SubscribeRequest();

  constructor(private fb: FormBuilder, private onSubs: SubscribeService) {}

  ngOnInit() {
    this.fGroupFooter = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ])
    });
  }
  onSubscribe() {
    if(!this.fGroupFooter.controls.email.invalid) {
      this.subcribeRequest = this.fGroupFooter.value;
      // this.emailSub.email = modelFooter.email;
      this.onSubs.newsLetter(this.subcribeRequest)
        .subscribe(data => {
          swal(data.message);
        },
        error => {
          swal('Ops, try again later');
          console.log('error', error);
        });
      this.fGroupFooter.reset();
    }
  }

}
