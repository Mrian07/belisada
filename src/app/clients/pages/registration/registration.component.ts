import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../servers/service/category/category.service';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  fullName: string;
  phone: number;
  email: string;
  password: string;
  verifyPassword: string;

  constructor(private categoryService: CategoryService) {


  }

  ngOnInit() {
  }

  register() {
    console.log(this.fullName + '-' + this.phone + '-' + this.email + '-' + this.password + '-' + this.verifyPassword);
  }

}
