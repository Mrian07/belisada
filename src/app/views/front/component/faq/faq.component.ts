import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  first;
  second;
  notFirst: any;
  not: any;
  constructor() { }

  ngOnInit() {
    // this.first = true;
    window.scrollTo(0, 0);
  }

  penjual() {
    this.first = true;
  }
  pembeli() {

    this.second = true;
  }

}
