import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  template: `
    <app-header></app-header>
      <router-outlet></router-outlet>
    <app-footer></app-footer>`,
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
