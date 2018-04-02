import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';
import { SigninRequest, UserLocalStorage } from '../../../core/services/user/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  token: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userService.getProfile(localStorage.getItem('token')).subscribe(data => {
      //console.log('ini:', data);
      // console.log('ini2:', data['0'].name);
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone;
      this.gender = data.gender;
      this.dateOfBirth = data.dateOfBirth;

    });
  //  console.log('ini:', localStorage.getUserData('token'));
  }

  edit() {
    this.router.navigate(['/buyer/profile-edit']);
  }
}
