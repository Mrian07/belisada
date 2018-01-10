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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  currentPage = 1;
  lastPages: number;
  start = 0;
  end = 0;
  total = 0;
  limit = 10;
  pages: any = [];
  listStyleType = 'list-row';

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.pages = [];

        if (params.page) {
          this.currentPage = params.page;
        }

        this.searchService.productList(params).subscribe(response => {
          this.productSearchResault = response;
          this.total = response.productCount;
          this.start = (this.currentPage - 1) * this.limit;
          this.end = this.start + this.limit;

          if (this.end > this.total) {
            this.end = this.total;
          }

          this.lastPages = response.pageCount;
          for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
            if (r > 0 && r <= this.lastPages) {
              this.pages.push(r);
            }
          }
        });
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.lastPages) { return false; }
    this.router.navigate(['/search'], { queryParams: { page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }
  listStyle(sty: string) {
    this.listStyleType = sty;
  }

}
