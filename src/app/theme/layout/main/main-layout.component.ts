import { Component, OnInit } from '@angular/core';
import { Globals } from '@belisada/core/services';

@Component({
  selector: 'bs-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {

  constructor(private globals: Globals) {
  }

  ngOnInit() {
  }

}
