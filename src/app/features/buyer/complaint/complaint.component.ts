import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {

  tabOrder: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.tabOrder = 'tabProduct';
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
