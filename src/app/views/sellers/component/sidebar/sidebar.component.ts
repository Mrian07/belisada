import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../core/service/profile/profile.service';
import { ActiveLink } from '../../../../core/service/shared.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router,
  private profileService: ProfileService,
  private active: ActiveLink
) {  }
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;

  pathArray: any;
  activeLink: any;

  ngOnInit() {
    this.getProfile();
    this.getUri();
  }

  getUri() {
    this.pathArray = window.location.pathname.split( '/' );
    this.activeLink = this.pathArray[2];
  }

  editProfile() {
    this.router.navigate(['/seller/profile']);
  }

  getProfile() {

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      console.log('kosong');
    }else {
      const data = JSON.parse(localStorage.user);
        if (data) {
          this.sellerName = data.name;
          this.sellerEmail = data.username;
          this.sellerPhone = '';
        }
    }
  }

}
