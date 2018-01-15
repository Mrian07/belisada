import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../core/service/profile/profile.service';
import { ActiveLink, ShareService } from '../../../../core/service/shared.service';
import { TokenService } from '../../../../core/service/token/token.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router,
  private profileService: ProfileService,
  private active: ActiveLink,
  private sharedService: ShareService,
  private tokenService: TokenService
) {  }
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  sellerimage: string;
  status1: Boolean = true;
  status2: Boolean = false;
  status3: Boolean = false;
  status4: Boolean = false;

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
    this.profileService.getProfile(this.tokenService.getToken()).subscribe(data => {
      this.sellerName = data.name;
      this.sellerEmail = data.email;
      this.sellerimage = 'data:image/png;base64,' + data.imageAvatar;
    });
  }

}
