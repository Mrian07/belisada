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
  selectedOption;
  navigation;
  boundary;
  selectedPage;

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit() {
    console.log('saerch');
    this.route.queryParams
      .subscribe(params => {
        this.searchService.productList(params).subscribe(response => {
          console.log('response: ', response);
        });
    });
  }

}
