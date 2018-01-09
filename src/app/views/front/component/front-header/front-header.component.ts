import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../core/model/category';
import { CategoryService } from '../../../../core/service/category/category.service';
import { SearchService } from '../../../../core/service/search/search.service';
import { Search } from '../../../../core/model/search';
import { Router } from '@angular/router';
import { SeoService } from '../../../../core/service/seo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent implements OnInit {

  categorySearch: Category[];
  selectedCategory: any;
  selectedSearchCategory: any;
  results = [];
  imgTop: any;
  selectCatsK: any;
  queryParams: any = {};
  isLogin: Boolean = false;

  title: string;
  text: string;
  type: string;

  constructor(private categoryService: CategoryService, private searchService: SearchService,
  private router: Router, private seo: SeoService) { }

  ngOnInit() {
    this.loadDataCategorySearch();
    // console.log('kampret di home search');
    this.seo.generateTags({
      title: 'Home',
      description: 'Belisada Home'
    });
  }

  searchK(event) {
    const key = event.target.value;
    if (key === '' || event.key === 'Enter') {
      this.results = [];
    } else {
      this.searchService.search(key).subscribe(data => {
        this.results = data;
      });
    }
  }
  productSelected(hasil: any) {
    this.router.navigateByUrl('/Product-detail/' + hasil.productId);
    this.results = [];
    // console.log('ini bener ga', hasil.productId);
  }
  hapusbersih() {
    this.selectedSearchCategory = '';
  }
  loadDataCategorySearch() {
    this.categoryService.CategoryOne().subscribe(data => {
      this.categorySearch = data;
    });
  }

  home() {
    this.router.navigateByUrl('/');
  }
  searchEnter(searchKey, searchCategory) {
    this.queryParams = { q: searchKey };
    if (typeof searchCategory !== 'undefined') {
      this.queryParams['parent'] = 1;
      this.queryParams['id'] = searchCategory.mProductCategoryId;
    }
    this.router.navigate(['/search'], { queryParams: this.queryParams });

  }

  login() {
    // this.isLogin = true;
  swal({
    title: 'Login Akun',
    // text: 'Silakan login sesuai dengan type akun Anda',
    type: 'info',
    html:
      '<div class="content">' +
      '<div class="ui grid">' +
          '<div class="eight wide column">' +
              '<div class="column">' +
                  '<div class="ui segment">' +
                      '<p><strong><i class="shopping bag icon"></i> Sebagai Buyer</strong></p>' +
                      // '<p>Login untuk customer Belisada.</p>' +
                      '<a href="/sign-in" class="ui green button">Enter</a>' +
                  '</div>' +
              '</div>' +
          '</div>' +
          '<div class="eight wide column">' +
              '<div class="column">' +
                  '<div class="ui segment">' +
                      '<p><strong><i class="shop icon"></i> Sebagai Seller</strong></p>' +
                      // '<p>Login untuk seller Belisada.</p>' +
                      '<a href="/login" class="ui olive button">Enter</a>' +
                  '</div>' +
              '</div>' +
          '</div>' +
      '</div>' +

  '</div>',
      showCloseButton: true,
      showConfirmButton: false,
      confirmButtonText: 'Yes, delete it!'
  } );

}
}
