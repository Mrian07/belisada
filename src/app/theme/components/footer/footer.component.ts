import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { SubscribeRequest } from '@belisada/core/models';
import { SubscribeService, ShareMessageService, AuthService } from '@belisada/core/services';
import { Router } from '@angular/router';
import { environment } from '@env/environment.local';
import { UserData } from '@belisada/core/models';
import { LocalStorageEnum } from '@belisada/core/enum';
import { UserService, Globals } from '@belisada/core/services';
import { LoadingService } from '@belisada/core/services/globals/loading.service';
import { empty } from 'rxjs';
import { ChatService } from '@belisada/core/services/globals/chat.service';
import { JoinRoom } from '@belisada/core/interfaces/join-room.interface';
import { RoomTypeEnum } from '@belisada/core/enum/room-type.enum';

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

  isLogin: number;

  constructor(
    public globals: Globals,
    private onSubs: SubscribeService,
    private _shareMessageService: ShareMessageService,
    private _userService: UserService,
    private _router: Router,
    private loadingService: LoadingService,
    private _authService: AuthService,
    private _chatService: ChatService,
  ) {}

  ngOnInit() {
    this.subscribe_email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
    ]);
    this.token = localStorage.getItem('token');
    this._getData();

    const userData = this._userService.getUserData(this._authService.getToken());
    this.isLogin = userData.userId;
    console.log('apa ini', userData);
  }

  /* Fungsi ini untuk mendaftarkan email dengan dilakukan validasi email terlebih dulu apakah sudah terdaftar atau belum. */
  subscribe() {
    this.loadingService.show();
    if (!this.subscribe_email.invalid) {
      this.subscribeRequest.email = this.subscribe_email.value;
      this.onSubs.newsLetter(this.subscribeRequest)
      .subscribe(data => {
        this.loadingService.hide();
        swal({title: data.message, showConfirmButton: true, timer: 1500, type: 'success'});
        if (data.status === 1) {
          this.subscribe_email.reset();
        } else if (data.status === 0)  {
          swal({title: 'Sudah Pernah Terdaftar', showConfirmButton: true, timer: 1500, type: 'warning'});
        }
      },
      error => {
        this.loadingService.hide();
        swal('Ops, try again later');
      });
    } else {
      this.loadingService.hide();
      if (this.subscribe_email.errors.required) {
        swal('Isi email anda', 'Email tidak boleh kosong', 'error');
      } else if (this.subscribe_email.errors.pattern) {
        swal('Cek alamat email anda', 'Format penulisan Email Salah', 'error');
      }
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

  alertChat() {
    this._chatService.show();
  }
}
