import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-404',
  templateUrl: './page-404.component.html',
  styleUrls: ['./page-404.component.scss']
})
export class Page404Component implements OnInit {

  constructor(private routes: Router) { }

  ngOnInit() {
  }

  backToHome(){
    this.routes.navigateByUrl('/home')
  }

}
