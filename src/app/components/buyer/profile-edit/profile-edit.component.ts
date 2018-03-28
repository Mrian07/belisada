import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { SigninRequest, UserLocalStorage } from '../../../core/services/user/models/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  createComForm: FormGroup;

  token: string;
  name: FormControl;
  email: FormControl;
  phone: FormControl;

  fm: any = {};

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.loadData();
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.phone = new FormControl('', Validators.required);
  }

  loadData() {
    this.userService.getProfile(localStorage.getItem('token')).subscribe(data => {
      // console.log('ini:', data);
      // console.log('ini2:', data['0'].name);

      // this.fm = {
      //   name : data['0'].name,
      //   email: data['0'].email,
      //   phone: data['0'].phone,
      // }

      this.createComForm = new FormGroup({
        name: data['0'].name,
        email: data['0'].email,
        phone: data['0'].phone,
      });

    });
  //  console.log('ini:', localStorage.getUserData('token'));
  }

}
