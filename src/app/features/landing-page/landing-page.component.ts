import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-landing-page',
  template: `
    <bs-main-layout>
        <router-outlet></router-outlet>
    </bs-main-layout>
  `
})
export class LandingPageComponent {

}
