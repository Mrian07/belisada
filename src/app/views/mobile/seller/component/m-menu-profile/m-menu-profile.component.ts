import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-m-menu-profile',
  templateUrl: './m-menu-profile.component.html',
  styleUrls: ['./m-menu-profile.component.scss']
})
export class MMenuProfileComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goProfile() {
    this.router.navigateByUrl('/mobile-seller/m-profile');
  }

  goChangePassword() {
    this.router.navigateByUrl('/mobile-seller/m-change-password');
  }

  goRekening() {
    this.router.navigateByUrl('/mobile-seller/m-rekening');
  }

  goInfoToko() {
    this.router.navigateByUrl('/mobile-seller/m-toko');
  }

}