import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

import { ClickOutsideDirective } from '@belisada/shared/directives';

import { UserData } from '@belisada/core/models';
import { UserService, SearchBarService } from '@belisada/core/services';
import { LocalStorageEnum } from '@belisada/core/enum';



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
  results = [];
  queryParams: any = {};
  selectedSearchCategory: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private userService: UserService,
    private search: SearchBarService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('isRemember') === 'true') {
      this.userData = this.userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    } else {
    console.log('userData : ', this.userData);
      if (isPlatformBrowser(this.platformId)) {
        const sess = sessionStorage.getItem(LocalStorageEnum.TOKEN_KEY);
        this.userData = this.userService.getUserData(sess);
      }
    }
    if (this.userData) { this.isLogin = true; }
    console.log('userData : ', this.userData);
  }

  searchK(event) {
    const key = event.target.value;
    if (key === '' || event.key === 'Enter') {
      this.results = [];
    } else {
      this.search.search(key).subscribe(data => {
        console.log(data);
      });
    }
  }
  searchEnter(searchKey, searchCategory) {
    this.queryParams = { st: 'product', q: searchKey };
    if (typeof searchCategory !== 'undefined') {
      this.queryParams['parent'] = 1;
      this.queryParams['id'] = searchCategory.mProductCategoryId;
    }
    this.router.navigate(['/search-result/product-list'], { queryParams: this.queryParams });
    this.selectedSearchCategory = '';
    this.results = [];
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
        if (localStorage.getItem('isRemember') === 'true') {
          localStorage.removeItem(LocalStorageEnum.TOKEN_KEY);
        } else {
          sessionStorage.clear();
          localStorage.removeItem('isRemember');
        }
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
