import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {

  tabOrder: string;
  orderNumber: string;
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.tabOrder = 'tabProduct';

    this._activatedRoute.queryParams.subscribe(qparams => {
      this.orderNumber = qparams.id;
      if (!this.orderNumber) {
        this.tabOrder = 'tabHistory';
      }
    });
  }

  tab(data, tabOrder) {

    if (tabOrder === data) {
      this.tabOrder = data;
    } else {
      this.router.navigateByUrl('/buyer/bantuan');
      this.tabOrder = data;
    }
  }

}
