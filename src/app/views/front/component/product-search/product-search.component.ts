import { ProductSearchResault } from './../../../../core/model/product-search-resut';
import { PorductList } from './../../../../core/model/product-list';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { SearchService } from '../../../../core/service/search/search.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  searchable;
  disabled;
  options;
  m_product_category_id;
  selectedOption;
  productSearchResault: ProductSearchResault = new ProductSearchResault();
  // alias: Category2 = new Category2();
  // productList: PorductList = new PorductList();
  navigation;
  boundary;
  selectedPage;

  constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService) { }
  currentPage: number = 1;
  lastPages: number;
  start: number = 0;
  end: number = 0;
  total: number = 0;
  limit: number = 10;
  pages: any = [];

  ngOnInit() {
    // this.test();
    // this.dapatkanListBarang(this.m_product_category_id);
    this.route.queryParams
      .subscribe(params => {
        this.pages = [];
        //console.log('saerch:', params);
        if (params.page) { this.currentPage = params.page; }
        this.searchService.productList(params).subscribe(response => {
          this.productSearchResault = response;
          this.total = response.productCount;
          this.start = (this.currentPage - 1) * this.limit;
          this.end = this.start + this.limit;
          if (this.end > this.total) { this.end = this.total; }
          this.lastPages = response.pageCount;
          console.log('rage', (this.currentPage - 3), (this.currentPage - (-4)));
          for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
            if (r > 0 && r <= this.lastPages) { this.pages.push(r); }
          }
          //console.log('response: ',  this.productSearchResault);
        });
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.lastPages) { return false; }
    this.router.navigate(['/search'], { queryParams: { page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

}
