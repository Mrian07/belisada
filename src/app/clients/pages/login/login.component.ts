import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servers/service/login/login.service';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private loginService: LoginService, private http: HttpClient) { }

  ngOnInit() {
  }

  login() {
    console.log(this.email);
    console.log(this.password);
    const login = {
      email : this.email,
      password : this.password
    };
    this.http.post('https://api.myacico.co.id/dev/account/masuk', login)
    // See below - subscribe() is still necessary when using post().
    .subscribe( data => {
        console.log(data);
    });
    // console.log(this.loginService.actionUrl)
    // this.loginService.doLogin('email': this.email, 'pasword': this.password).subscribe(data => {
    //   console.log(data);
    // });
  }

}
