import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginData } from '../../../../core/model/login';
import { LoginService } from '../../../../core/service/login/login.service';
import { SendEmailService } from '../../../../core/service/sendEmail/send-email.service';
import { TokenService } from '../../../../core/service/token/token.service';
import { Title } from '@angular/platform-browser';


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

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
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
}
