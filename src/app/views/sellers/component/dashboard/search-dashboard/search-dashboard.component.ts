import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ActiveLink } from '../../../../../core/service/shared.service';


@Component({
  selector: 'app-search-dashboard',
  templateUrl: './search-dashboard.component.html',
  styleUrls: ['./search-dashboard.component.scss']
})
export class SearchDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private title: Title,
    private active: ActiveLink
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Dashboard');
  }
  search(event) {
    const key = event.target.value;
    // this.searchService.searchProduct(key).subscribe(data => {
    //   console.log(data);
    // });
  }
  // getCategory() {
  //   this.categoryService.getAll().subscribe(data => {
  //     console.log(data);
  //   });
  // }
  addProducts() {
    this.router.navigate(['seller/add-products/add']);
  }

}
