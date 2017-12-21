import { RegisterService } from './../../../servers/service/register/register.service';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  email: string;
  password: string;
  phone: string;
  name: string;
  password2: string;
  iscorporate = 'N';
  userType = '1';
  constructor(private http: HttpClient, private categoryService: RegisterService) {  }

  ngOnInit() {
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
    if (typeof registerData.name === 'undefined') {
      swal(
        'Opps!',
        'Nama tidak boleh kosong.',
        'error'
      );
      return false;
    }
    if (typeof registerData.password === 'undefined') {
      swal(
        'Opps!',
        'password tidak boleh kosong.',
        'error'
      );
      return false;
    }
    if (typeof registerData.email === 'undefined') {
      swal(
        'Opps!',
        'Email tidak boleh kosong.',
        'error'
      );
      return false;
    }
    if(this.password.length < 7) {
      swal(
        'Opps!',
        'password harus 7.',
        'error'
      );
      return false;
    }else
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
          'success',
          data.message,
          'success'
        );
      }else {
        swal(
          'Opps!',
          data.message,
          'error'
        );
      }


    });
  }

}
