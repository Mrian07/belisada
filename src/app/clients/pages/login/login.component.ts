import { SendEmailService } from './../../../servers/service/sendEmail/send-email.service';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servers/service/login/login.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../../../servers/service/token/token.service';
import * as UserActions from '../../../store/app.action';
import { LoginData } from '../../../servers/model/login';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

interface UserState {
  users: LoginData;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  users: Observable<LoginData>;

  email: string;
  password: string;
  returnUrl: string;
  loading = false;
  token: string;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private sendEmailService: SendEmailService,
    private tokenService: TokenService,
    private store: Store<UserState>
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'seller/dashboard';
    this.checkToken();
    this.users = this.store.select('users');
    console.log(this.users);
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
              console.log(response);
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
        console.log(data);
        this.store.dispatch(new UserActions.UserState(data));
        this.loginService.user = data;
        localStorage.user = JSON.stringify(data);
        this.loginService.isLoggedin();
        this.router.navigate([this.returnUrl]);
      }
    });
  }

  checkToken() {
    if (!localStorage.user) {

    }else {
      this.tokenService.checkToken().subscribe(data => {
        console.log(data);
        if (data.status === '0') {
          console.log('not');
            swal({
            title: 'Warning',
            text: 'Login Expired, Please Relogin',
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Re-Login'
          }).then((result) => {
            console.log(result);
          });
        }else {
          console.log('valid');
          this.router.navigate([this.returnUrl]);
        }
      });
    }
  }
}
