import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubscribeService } from '../../../core/services/subscribe/subscribe.service';
import swal from 'sweetalert2';
import { SubscribeM } from '../../../core/services/subscribe/model/subscribe-m';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public fGroupFooter: FormGroup;
  email: FormControl;
  emailSub: SubscribeM = new SubscribeM();
  constructor(private fb: FormBuilder, private onSubs: SubscribeService) {}

  ngOnInit() {
      this.fGroupFooter = this.fb.group({
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ])
      });
  }
  onSubscribe(email: string) {
      const modelFooter = this.fGroupFooter.value;
      this.emailSub.email = modelFooter.email,
          this.onSubs.newsLetter(this.emailSub)
          .subscribe(
              data => {
                  if (data.message === '1') {
                      swal(data.message);
                  } else {
                      swal(data.message);
                  }
              },
              error => {
                  console.log('error', error);
              });
              this.fGroupFooter.reset();
  }

}
