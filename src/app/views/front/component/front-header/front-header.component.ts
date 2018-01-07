import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../core/model/category';
import { CategoryService } from '../../../../core/service/category/category.service';
import { SearchService } from '../../../../core/service/search/search.service';
import { Search } from '../../../../core/model/search';
import { Router } from '@angular/router';
import { SeoService } from '../../../../core/service/seo.service';
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
  constructor(private categoryService: CategoryService, private searchService: SearchService,
    private router: Router, private seo: SeoService) { }

  ngOnInit() {
    this.loadDataCategorySearch();
    console.log('kampret di home search');
    this.seo.generateTags({
      title: 'Home',
      description: 'Belisada Home'
    });
  }

  searchK(event) {
    const key = event.target.value;
    if (key === '') {
      this.results = [];
    }else {
      this.searchService.search(key).subscribe(data => {
        this.results = data;
      });
    }
  }
  productSelected(hasil: any) {
    this.router.navigateByUrl('/Product-detail/' + hasil.productId);
    location.reload();
    console.log('ini bener ga', hasil.productId);
  }
  loadDataCategorySearch() {
    this.categoryService.CategoryOne().subscribe(data => {
      this.categorySearch = data;
    });
  }

  home() {
    this.router.navigateByUrl('/');
  }

}
