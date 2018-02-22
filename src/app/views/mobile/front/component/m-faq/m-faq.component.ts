import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m-faq',
  templateUrl: './m-faq.component.html',
  styleUrls: ['./m-faq.component.scss']
})
export class MFaqComponent implements OnInit {
first;
  second;
  notFirst: any;
  not: any;
  constructor() { }

  ngOnInit() {
  }

  penjual() {
    this.first = true;
  }
  pembeli() {

    this.second = true;
  }

}
