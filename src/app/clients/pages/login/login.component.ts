import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servers/service/login/login.service';
import { Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.email);
    console.log(this.password);
    console.log(this.loginService.actionUrl)
    this.loginService.doLogin(email: this.email, pasword:this.password).subscribe(data => {
      console.log(data);
    });
  }

}
