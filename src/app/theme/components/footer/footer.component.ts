import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { SubscribeRequest } from '@belisada/core/models';
import { SubscribeService, ShareMessageService } from '@belisada/core/services';
import { Router } from '@angular/router';
import { environment } from '@env/environment.local';
import { UserData } from '@belisada/core/models';
import { LocalStorageEnum } from '@belisada/core/enum';
import { UserService, Globals } from '@belisada/core/services';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subscribe_email: FormControl;
  subscribeRequest: SubscribeRequest = new SubscribeRequest();
  public flag: string;
  public btnJual: boolean;
  token: any;
  public baseUrlSeller: string = environment.baseUrlSeller;
  public userData: UserData = new UserData();

  constructor(
    public globals: Globals,
    private onSubs: SubscribeService,
    private _shareMessageService: ShareMessageService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.subscribe_email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
    ]);
    this.token = localStorage.getItem('token');
    this._getData();
  }

  /* Fungsi ini untuk mendaftarkan email dengan dilakukan validasi email terlebih dulu apakah sudah terdaftar atau belum. */
  subscribe() {
    if (!this.subscribe_email.invalid) {
    this.subscribeRequest.email = this.subscribe_email.value;
    this.onSubs.newsLetter(this.subscribeRequest)
      .subscribe(data => {
        swal(data.message);
        if (data.status === 1) {
          this.subscribe_email.reset();
        }
      },
      error => {
        swal('Ops, try again later');
      });
    }
  }

  cekFlag() {
    this._shareMessageService.currentMessage.subscribe(respon => {
      this.flag = respon;
      if (this.flag === 'create-store') {
        this.btnJual = true;
      }
    });
  }

  goToCreateStore() {
    this._router.navigateByUrl('/buyer/create-store');
    this.cekFlag();
  }

  private _getData() {
    this.userData = this._userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
  }
}
