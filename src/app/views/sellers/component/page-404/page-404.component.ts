import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-404',
  templateUrl: './page-404.component.html',
  styleUrls: ['./page-404.component.scss']
})
export class Page404Component implements OnInit {

  constructor(private routes: Router, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Belisada - 404');
  }

  backToHome() {
    this.routes.navigateByUrl('/home');
  }

}
