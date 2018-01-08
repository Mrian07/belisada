import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('saerch');
    this.route.queryParams
      .subscribe(params => {
        console.log('params: ', params);
    });
  }

}
