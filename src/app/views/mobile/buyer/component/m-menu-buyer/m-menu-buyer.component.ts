import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  ) { }

  ngOnInit() {

  }
  goSeller() {

  }
  goWishlist() {

  }
  goTransaction() {

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
}
