import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../../servers/service/profile/profile.service';
import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private profileService: ProfileService) {  }
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;


  ngOnInit() {
    this.getProfile();
  }

  editProfile() {
    this.router.navigate(['/seller/profile']);
  }

  getProfile() {

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      console.log('kosong');
    }else {
      this.profileService.getProfile(user.token).subscribe(data => {
        console.log(data);
        if (data) {
          this.sellerName = data.name;
          this.sellerEmail = data.email;
          this.sellerPhone = '';
        }
      });
    }
  }

}
