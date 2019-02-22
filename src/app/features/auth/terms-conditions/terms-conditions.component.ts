import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.body.scrollIntoView({behavior: 'smooth'});
  }

}
