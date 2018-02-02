import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.scss']
})
export class MenuProfileComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goProfile() {
    this.router.navigateByUrl('/seller/profile');
  }

  goChangePassword() {
    this.router.navigateByUrl('/seller/change-password');
  }

  goRekening() {
    this.router.navigateByUrl('/seller/rekening');
  }

  goInfoToko() {
    this.router.navigateByUrl('/seller/toko');
  }

}
