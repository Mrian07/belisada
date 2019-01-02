import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'bs-buyer',
  template: `
    <bs-buyer-layout>
      <router-outlet></router-outlet>
    </bs-buyer-layout>`
})
export class BuyerComponent {

  constructor() { }
}
