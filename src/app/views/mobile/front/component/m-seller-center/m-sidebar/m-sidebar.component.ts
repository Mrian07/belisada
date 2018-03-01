import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-m-sidebar',
  templateUrl: './m-sidebar.component.html',
  styleUrls: ['./m-sidebar.component.scss']
})
export class MSidebarComponent implements OnInit {

  uri: string[] = [];
  
    constructor(
      private router: Router,
      private route: ActivatedRoute
    ) { }
  
    ngOnInit() {
      this.route.url.subscribe( url => {
        console.log('url: ', url);
        this.uri = this.router.url.split('/');
        console.log('this.uri: ', this.uri);
      });
    }

  }