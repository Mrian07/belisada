import { Component, OnInit } from '@angular/core';
import { Globals } from '@belisada/core/services';

@Component({
  selector: 'bs-auth-layout',
  template: `
    <div class="daddy-container">
      <div class="overlay-header" *ngIf="globals.isBackdropActive === true"></div>
      <app-header></app-header>
      <div class="container-fluid has-header has-footer"> <!-- TODO: [PAK LALANG] Change container-fluid class to container -->
        <div class="container">
          <div class="row">
            <div class="col-7">
              <bs-side-auth></bs-side-auth>
            </div>

            <div class="col-5">
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
      </div>

      <app-footer></app-footer>
    </div>`
})
export class AuthLayoutComponent {

  constructor(public globals: Globals) {
  }

}
