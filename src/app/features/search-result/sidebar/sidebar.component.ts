import { Component, OnInit } from '@angular/core';
import { FilterSService } from '@belisada/core/services';
import { FilterM } from '@belisada/core/models/filter/filter-m';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  testing: FilterM = new FilterM();
  userlist: any;
  userlistClass: any;
  a;
  en;
  constructor( private filterService: FilterSService, ) { }

  ngOnInit() {
    this.getUser();
  //   this.filterService.getFilter().subscribe(response => {
  //  this.testing = response;
  //  console.log(response);
  //   });
  }
  public getUser() {
    this.filterService.getFilter().subscribe(
      user => {
        this.userlist = user;
        console.log('ini', user);
        for (this.en of  this.userlist) {
          this.a = this.en.filter;
          const b = this.en;
          console.log('diluar', this.en.filter);

          if (this.a === 'Brand') {
            this.userlist = b.data;
          }
          if (this.a === 'Classification') {
            this.userlistClass = b.data;
            console.log('oke',  this.userlistClass );
          }
      }
      },
    );
  }

}
