import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servers/service/login/login.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    const loginData = {
      email : this.email,
      password : this.password
    };

    this.loginService.doLogin(loginData).subscribe(data => {
      if(data.status == '0') {
        swal( 'Error!', data.message, 'error' );
      }
      else {
        this.loginService.user = data;
        localStorage.user = JSON.stringify(data);
        this.router.navigate(['seller/dashboard']);
      }
      console.log(data);
    });
  }

}
