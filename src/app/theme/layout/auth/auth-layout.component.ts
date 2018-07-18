import { Component, OnInit } from '@angular/core';
import { Globals } from '@belisada/core/services';

@Component({
  selector: 'bs-auth-layout',
  template: `
    <div class="overlay-header" *ngIf="globals.isBackdropActive === true"></div>
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

    constructor(private globals: Globals) {
    }

}
