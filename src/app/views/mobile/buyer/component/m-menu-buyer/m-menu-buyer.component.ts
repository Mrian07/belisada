import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../../../core/service/profile/profile.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-m-menu-buyer',
  templateUrl: './m-menu-buyer.component.html',
  styleUrls: ['./m-menu-buyer.component.scss']
})
export class MMenuBuyerComponent implements OnInit {
  isOpen;
  isDisabled;
  constructor(
    private router: Router,
    private profileService: ProfileService
  ) { }

  userImgAvatar: string;
  fm: any = {};
  name: string;
  email: string;

  ngOnInit() {
    this.fillForms();
  }

  fillForms() {
    const luser = JSON.parse(localStorage.getItem('user'));
    this.profileService.getProfileBuyer(luser.token).subscribe(data => {

      this.userImgAvatar = data.imageAvatar ?'data:image/png;base64,' + data.imageAvatar : '/assets/img/kristy.png';
      this.name = data.name;
      this.email = data.email;
    });
  }

  goSeller() {
    this.router.navigateByUrl('/mobile/buyer');
    const user = JSON.parse(localStorage.user);
    if (user.role === 3 || user.role === 2) {
      this.router.navigateByUrl('/mobile-seller');
    } else {

      swal({
        title: 'Warning',
        text: 'Anda belum menjadi Seller. Apakah Anda ingin mendaftar sebagai Seller?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1d7d0a',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Daftar Sebagai Seller'
      }).then((result) => {
        if (result.value) {
            this.router.navigateByUrl('/mobile/buyer/m-seller-propose');
        } else {
            return false;
        }
      });

   }

  }
  goWishlist() {
    this.router.navigateByUrl('/mobile/buyer/m-wishlist-buyer');
  }
  goTransaction() {
    this.router.navigateByUrl('/mobile/buyer/m-transaction-buyer');
  }

  goDashboard() {
    this.router.navigateByUrl('/mobile/buyer');
  }

  editProfileBuyer() {
    this.router.navigateByUrl('/mobile/buyer/m-profile-buyer');
  }

  goChangePassword() {
    this.router.navigateByUrl('/mobile/buyer/m-change-password-buyer');
  }

  goBilling() {
    this.router.navigateByUrl('/mobile/buyer/m-billingAddress');
  }

  goShipping() {
    this.router.navigateByUrl('/mobile/buyer/m-shippingAddress');
  }

  goAvatar() {
    this.router.navigateByUrl('/mobile/buyer/m-avatar-buyer');
  }
}
