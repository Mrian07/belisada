import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servers/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    const loginData = {
      email : this.email,
      password : this.password
    };

    this.loginService.doLogin(loginData).subscribe(data => {
      console.log(data);
    });
  }

}
