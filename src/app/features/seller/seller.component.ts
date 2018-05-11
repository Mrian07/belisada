import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-seller',
  template: `
    <bs-seller-layout>
      <router-outlet></router-outlet>
    </bs-seller-layout>`
})
export class SellerComponent {

  constructor() { }
}
