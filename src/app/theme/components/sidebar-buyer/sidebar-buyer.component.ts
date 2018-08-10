import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ShareMessageService, UserService } from '@belisada/core/services';
import { UserData } from '@belisada/core/models';
import { LocalStorageEnum } from '@belisada/core/enum';

import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'bs-sidebar-buyer',
  templateUrl: './sidebar-buyer.component.html',
  styleUrls: ['./sidebar-buyer.component.scss']
})

export class SidebarBuyerComponent implements OnInit {
  flag: string;
  btnJual: boolean;
  userData: UserData = new UserData();
  isLogin: Boolean = false;
  pemisah: any;

  zzzz;
  public location = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private shareMessageService: ShareMessageService,
    private userService: UserService,
  ) {
    this.location = router.url;
  }

  ngOnInit() {
    this.btnJual = false;
    this.userData = this.userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    this.pemisah = this.userData.role;
    if (this.userData) { this.isLogin = true; }
    this.pemisah = this.userData.role;
  }

  cekFlag() {
    this.shareMessageService.currentMessage.subscribe(respon => {
      this.flag = respon;
      if (this.flag === 'create-store') {
        this.btnJual = true;
      }
    });
  }

  goToCreateStore() {
    this.router.navigateByUrl('/buyer/create-store');
    this.cekFlag();
  }

  goToSeller() {
    this.zzzz = 'https://seller0.belisada.id/auth/sign-in';
  }

  profile() {
    this.btnJual = false;
    this.router.navigateByUrl('/buyer/profile');
  }

  myOrder() {
    this.btnJual = false;
    this.router.navigateByUrl('/buyer/order');
  }

  confirmation() {
    this.btnJual = false;
    this.router.navigateByUrl('/buyer/confirmation');
  }

}
