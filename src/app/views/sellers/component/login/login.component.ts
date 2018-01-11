import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import { LoginData } from '../../../../core/model/login';
import { LoginService } from '../../../../core/service/login/login.service';
import { SendEmailService } from '../../../../core/service/sendEmail/send-email.service';
import { TokenService } from '../../../../core/service/token/token.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Store, ActionsSubject } from '@ngrx/store/';
import * as fromActions from '../../../../store/actions';
import * as fromProduct from '../../../../store/reducers';
import { Login } from '../../../../store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  email: string;
  password: string;
  returnUrl: string;
  loading = false;
  token: string;
  loginSub: Subscription;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private socialAuthService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private actionsSubject: ActionsSubject,
    private store: Store<fromProduct.User>,
    private sendEmailService: SendEmailService,
    private tokenService: TokenService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada - Login');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'seller/dashboard';
    if (this.tokenService.getToken() === undefined) {
    } else {
      this.router.navigateByUrl('/seller/dashboard');
    }
    this.loginSub = this.actionsSubject
    .asObservable()
    .filter(action => action.type === fromActions.LOGINSUCCESS)
    .subscribe((action: fromActions.LoginSuccess) => {
      this.loading = false;
      console.log(action);
      localStorage.user = JSON.stringify(action);
      //this.router.navigateByUrl('/seller/dashboard');
        // swal(
        //     'Produk berhasil di Perbaharui!',
        //     'success'
        //   ).then((result) => {

        //     // this.clearAll();
        //     // this.shared.shareData = '';
        //     this.router.navigateByUrl('/seller/dashboard');
        //   });
    });
  }

  login() {
    this.loading = true;
    const loginData = {
      username : this.email,
      password : this.password
    };
    this.loginService.doLogin(loginData).subscribe(data => {
      if (data.status === '0') {
        swal( 'Error!', data.message, 'error' );
        this.loading = false;
      } else if (data.status === '2') {
        swal({
          title: 'Warning',
          text: data.message,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Kirim ulang email aktivasi'
        }).then((result) => {
          if (result.value) {
            this.sendEmailService.SendEmail({
              email : this.email,
              type: 'activation'
            }).subscribe(response => {
              swal({
                type: 'success',
                title: response.message,
                showConfirmButton: false
              });
            });
          }
        });
        this.loading = false;
      } else {
        this.loginService.user = data;
        localStorage.user = JSON.stringify(data);
        this.loginService.isLoggedin();
        this.router.navigate([this.returnUrl]);
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
