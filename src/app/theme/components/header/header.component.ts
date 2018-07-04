import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

import { UserData } from '@belisada/core/models';
import { UserService, SearchBarService } from '@belisada/core/services';
import { LocalStorageEnum } from '@belisada/core/enum';
import { SearchService } from '@belisada/core/services/search/search.service';
import { SearchBarResponse } from '@belisada/core/models/search/search.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isSelectBoxActive: Boolean = false;
  userData: UserData = new UserData();
  isLogin: Boolean = false;
  isAccountMenu: Boolean = false;
  results = [];
  queryParams: any = {};
  // selectedSearchCategory: any;
  searchBarResults: SearchBarResponse[];
  keyword: string;
  showSearch: Boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private userService: UserService,
    private search: SearchBarService,
    private searchService: SearchService
  ) {
    this.searchBarResults = [];
  }

  ngOnInit() {
    console.log('this.showSearch: ', this.showSearch);
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

  onSearchFocusOut() {
    setTimeout(() => {
      this.showSearch = false;
    }, 100);
  }

  searchK(event) {
    const key = event.target.value;
    console.log('event: ', event.keyCode);
    console.log('key: ', key);
    console.log('this.keyword: ', this.keyword);
    if (event.keyCode !== 13) {
      this.showSearch = true;
    }
    this.keyword = key;
    const queryParams = {
      q: key
    };
    this.searchService.getSearchBar(queryParams).subscribe(result => {
      this.searchBarResults = result;
    });
  }
  searchEnter(event) {
    const key = event.target.value;
    this.queryParams = { st: 'product', q: key };
    this.showSearch = false;
    this.router.navigate(['/search-result/product-list'], { queryParams: this.queryParams });
  }

  clickSearch(key, catID) {
    const queryParams = {
      st: 'product',
      q: key,
      category: [catID]
    };
    this.router.navigate(['/search-result/product-list'], { queryParams: queryParams });
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
