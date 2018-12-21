import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  tabOrder: 'ALL';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe((queryParam) => {
      this.tabOrder = (queryParam.status) ? queryParam.status : 'ALL';
    });
  }

  ngOnInit() {
  }

  tab(data) {
    this.tabOrder = data;
    this.router.navigate(['/buyer/order'], { queryParams: {page: 1, status: data}, queryParamsHandling: 'merge' });
  }

}
