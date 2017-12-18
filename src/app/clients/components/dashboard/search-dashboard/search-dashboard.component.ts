import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../servers/service/category/category.service';
import { SearchService } from '../../../../servers/service/search/search.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-search-dashboard',
  templateUrl: './search-dashboard.component.html',
  styleUrls: ['./search-dashboard.component.scss']
})
export class SearchDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
   // this.getCategory();
  }
  // search(event) {
  //   const key = event.target.value;
  //   this.searchService.searchProduct(key).subscribe(data => {
  //     console.log(data);
  //   });
  // }
  // getCategory() {
  //   this.categoryService.getAll().subscribe(data => {
  //     console.log(data);
  //   });
  // }
  addProducts() {
    this.router.navigate(['seller/add-products']);
  }

}
