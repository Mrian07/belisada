import { Component, OnInit } from '@angular/core';
import { Globals } from '@belisada/core/services';


@Component({
  selector: 'bs-buyer-layout',
  templateUrl: './buyer-layout.component.html'
})
export class BuyerLayoutComponent {

  isMenu: boolean;

  constructor(private globals: Globals) {
  }

}
