import { Profile } from './../../../core/services/user/models/user';
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

  /* Mendeklarasikan nama variable*/
  profile: Profile = new Profile();
  gender: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  /* Fungsi ini untuk melakukan penarikan data melalui fungsi getProfile() yang berada pada userService */
  loadData() {
    this.userService.getProfile().subscribe(data => {
      this.profile = data;
      if (this.profile.gender === 'M') {
        this.gender = 'Laki-laki';
      } else if (this.profile.gender === 'F') {
        this.gender = 'Perempuan';
      } else {
        this.gender = '';
      }

    });
  }

  /* Fungsi ini untuk berpindah halaman ke halaman edit */
  edit() {
    this.router.navigate(['/buyer/profile-edit']);
  }
}
