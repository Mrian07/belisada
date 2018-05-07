import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-auth-layout',
  template: `
    <app-header></app-header>
    <div class="wrapper-authentication containPage">
        <bs-side-auth></bs-side-auth>

        <div>
            <router-outlet></router-outlet>
        </div>
    </div>

    <app-footer></app-footer>`
})
export class AuthLayoutComponent {

  constructor() { }

}
