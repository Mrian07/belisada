import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m-change-password-buyer',
  templateUrl: './m-change-password-buyer.component.html',
  styleUrls: ['./m-change-password-buyer.component.scss']
})
export class MChangePasswordBuyerComponent implements OnInit {

  old_password: string;
  password_baru: string;
  password_ulangi: string;
  changePassword: any;
  token: any;
  role: any;
  viewPass: Boolean = false;
  viewPass2: Boolean = false;
  viewPass3: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  togglePass() {
    this.viewPass = !this.viewPass;
    const el = (<HTMLInputElement>document.getElementById('password'));
    if (this.viewPass) {
      el.type = 'text';
    } else {
      el.type = 'password';
    }
  }

  togglePass2() {
    this.viewPass2 = !this.viewPass2;
    const el2 = (<HTMLInputElement>document.getElementById('password2'));
    if (this.viewPass2) {
      el2.type = 'text';
    } else {
      el2.type = 'password';
    }
  }

  togglePass3() {
    this.viewPass3 = !this.viewPass3;
    const el3 = (<HTMLInputElement>document.getElementById('password3'));
    if (this.viewPass3) {
      el3.type = 'text';
    } else {
      el3.type = 'password';
    }
  }

}