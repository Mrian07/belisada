import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-buyer',
  templateUrl: './sidebar-buyer.component.html',
  styleUrls: ['./sidebar-buyer.component.scss']
})
export class SidebarBuyerComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  profile() {
    this.router.navigateByUrl('/account/profile');
  }

}
