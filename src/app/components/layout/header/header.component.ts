import { LocalStorageEnum } from './../../../core/enum/local-storage.enum';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { UserData } from '../../../core/services/user/models/user';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // directives: [ClickOutsideDirective],
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isSelectBoxActive: Boolean = false;
  userData: UserData = new UserData();
  isLogin: Boolean = false;
  isAccountMenu: Boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userData = this.userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    if (this.userData) { this.isLogin = true; }
  }

  logout() {
    swal({
      title: 'belisada.co.id',
      text: 'Anda yakin akan logout?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem(LocalStorageEnum.TOKEN_KEY);
        this.isAccountMenu = false;
        swal(
          'Success!',
          'Anda sudah keluar dari Account Area.',
          'success'
        ).then(() => {
          this.router.navigateByUrl('/');
          location.reload();
        });
      }
    });
  }

  toggleAccountMenu() {
    this.isAccountMenu = !this.isAccountMenu;
  }

  onClickOutside(event: Object) {
    if (event && event['value'] === true) {
      this.isAccountMenu = false;
    }
  }
  goToProfile() {
    this.router.navigateByUrl('/buyer/profile');
  }

}
