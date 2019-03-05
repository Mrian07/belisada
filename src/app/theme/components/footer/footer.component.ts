import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { SubscribeRequest } from '@belisada/core/models';
import { SubscribeService } from '@belisada/core/services';
import { LoadingService } from '@belisada/core/services/globals/loading.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subscribe_email: FormControl;
  subscribeRequest: SubscribeRequest = new SubscribeRequest();

  constructor(
    private onSubs: SubscribeService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.subscribe_email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
    ]);
  }

  /* Fungsi ini untuk mendaftarkan email dengan dilakukan validasi email terlebih dulu apakah sudah terdaftar atau belum. */
  subscribe() {
    this.loadingService.show();
    if (!this.subscribe_email.invalid) {
    this.subscribeRequest.email = this.subscribe_email.value;
    this.onSubs.newsLetter(this.subscribeRequest)
      .subscribe(data => {
        this.loadingService.hide();
        swal(data.message);
        if (data.status === 1) {
          this.subscribe_email.reset();
        }
      },
      error => {
        this.loadingService.hide();
        swal('Ops, try again later');
      });
    }
  }

}
