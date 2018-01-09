import { ProductSearchResault } from './../../../../core/model/product-search-resut';
import { PorductList } from './../../../../core/model/product-list';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit() {
    // this.test();
    // this.dapatkanListBarang(this.m_product_category_id);
    console.log('saerch');
    this.route.queryParams
      .subscribe(params => {
        this.searchService.productList(params).subscribe(response => {
          this.productSearchResault = response;
          console.log('response: ',  this.productSearchResault);
        });
    });
  }

}
