import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-m-menu-buyer',
  templateUrl: './m-menu-buyer.component.html',
  styleUrls: ['./m-menu-buyer.component.scss']
})
export class MMenuBuyerComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

  }

  goDashboard() {
    this.router.navigateByUrl('/mobile/buyer');
  }

  editProfileBuyer() {
    this.router.navigateByUrl('/mobile/buyer/m-profile-buyer');
  }

}
