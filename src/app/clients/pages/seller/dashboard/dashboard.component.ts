import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../servers/service/category/category.service';
import { SearchService } from '../../../../servers/service/search/search.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  veryfyProduct: number;
  rejectedProduct: number;
  sendProduct: number;
  sellProduct: number;
  pendingProduct: number;
  returnProduct: number;
  searchText: string;

  verify = [];
  rejected = [];
  send = [];
  sell = [];
  pending = [];
  return = [];
  productList = [];

  constructor(private categoryService: CategoryService, private searchService: SearchService, private router: Router ) {
  }

  ngOnInit() {
    this.veryfyProduct = this.verify.length;
    this.rejectedProduct = this.rejected.length;
    this.sendProduct = this.send.length;
    this.sellProduct = this.sell.length;
    this.pendingProduct = this.pending.length;
    this.returnProduct = this.return.length;
    this.productList = [
      {
        'orderId': '#5765675655',
        'product': 'Asus ROG',
        'qty': '3',
        'status': 'success',
        'date': '2017-12-09'
      },
      {
        'orderId': '#5765675615',
        'product': 'Macbook pro 15"',
        'qty': '1',
        'status': 'success',
        'date': '2017-12-10'
      },
      {
        'orderId': '#5765675673',
        'product': 'iPhone X',
        'qty': '6',
        'status': 'pending',
        'date': '2017-12-20'
      }
    ];
    this.getCategory();
  }

  search(event) {
    const key = event.target.value;
    this.searchService.Search(key).subscribe(data => {
      console.log(data);
    });
  }

  getCategory() {
    this.categoryService.getAll().subscribe(data => {
      console.log(data);
    });
  }

  addProducts() {
    this.router.navigate(['seller/add-products']);
  }
}
