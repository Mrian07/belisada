import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegisterService } from '../../../../core/service/register/register.service';
import { Title } from '@angular/platform-browser';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import { ShareService } from '../../../../core/service/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  email: string;
  password: string;
  phone: string;
  name: string;
  password2: string;
  iscorporate = 'N';
  userType = '2';
  clickMessage = '';
  loka: any;
  tc: string;
  loading: any;
  isReady: Boolean = false;
  viewPass: Boolean = false;
  viewPass2: Boolean = false;

  constructor(
    private http: HttpClient,
    private categoryService: RegisterService,
    public modalService: SuiModalService,
    private router: Router,
    private title: Title,
    private shared: ShareService,
    private socialAuthService: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada Buyer - Registration');
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

  

  // mouseoverPass() {
  //   this.obj = document.getElementById('password');
  //   this.obj.type = 'text';
  //   this.viewPass = true;
  //   this.hidePass = false;
  // }

  // mouseoutPass() {
  //   this.obj = document.getElementById('myPassword');
  //   this.obj.type = 'password';
  //   this.hidePass = true;
  //   this.viewPass = hide;
  // }

  popUp() {
    this.isReady = true;
  }

  register() {
    const registerData = {
      email : this.email,
      password : this.password,
      name : this.name,
      iscorporate: this.iscorporate,
      userType: this.userType,
      password2: this.password2
    };
    console.log(registerData.name);
    if (this.password !== this.password2) {
      swal(
        'Opps!',
        'password harus sama.',
        'error'
      );
      return false;
    }

    console.log(registerData);
    this.categoryService.register(registerData).subscribe(data => {
      // console.log('ini data', data);
      if (data.status === '1') {
        swal(
          'Selamat',
          'Pendaftaran Anda Berhasil',
          'success',
        ).then(() => {
         // this.loka = this.shared.shareData;
         this.shared.shareData = registerData;
          //console.log(this.loka);
          //location.reload();
          this.router.navigateByUrl('/PesanLogin');
        });
      }else {
        swal(
          'Opps!',
          data.message,
          'error',

        );
      }
    });
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + 'sign in data : ' , userData);
      }
    );
  }
}
