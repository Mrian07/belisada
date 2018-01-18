import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../core/service/profile/profile.service';
import { ActiveLink, ShareService } from '../../../../core/service/shared.service';
import { TokenService } from '../../../../core/service/token/token.service';
import { StoreService } from '../../../../core/service/store/store.service';
import swal from 'sweetalert2';

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
  private tokenService: TokenService,
  private storeService: StoreService
) {  }
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  sellerimage: string;
  status1: Boolean = true;
  status2: Boolean = false;
  status3: Boolean = false;
  status4: Boolean = false;
  status: any;

  pathArray: any;
  activeLink: any;

  ngOnInit() {
    this.getProfile();
    this.getUri();
    this.getStoreStatus();
  }

  getStoreStatus() {
    this.storeService.getStatus().subscribe(data => {
      console.log(data);
        this.status = data[0].statusCode;
    });
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
      if (data.imageAvatar === '') {
        this.sellerimage = 'assets/img/kristy.png';
      }else {
        this.sellerimage = 'data:image/png;base64,' + data.imageAvatar;
      }
    });
  }
  goToProduct() {
    if (this.status === '2') {
      swal(
        'Belisada.co.id',
        'Toko Anda belum diverifikasi!'
      ).then((result) => {
       // this.router.navigateByUrl('seller/toko');
      });
    }else {
      this.router.navigateByUrl('seller/product-list');
    }
  }

}
