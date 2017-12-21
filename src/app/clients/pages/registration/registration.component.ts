import { RegisterService } from './../../../servers/service/register/register.service';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  email: string;
  password: string;
  phone: string;
  name: string;
  iscorporate: '1';
  userType: string;
  constructor(private http: HttpClient, private categoryService: RegisterService) {


  }

  ngOnInit() {
  }
  register() {
    const registerData = {
      email : this.email,
      password : this.password,
      name : this.name,
      iscorporate: this.iscorporate,
      userType: this.userType
    };
    this.categoryService.register(registerData).subscribe(data => {
      console.log(data);
    });
  }

}
