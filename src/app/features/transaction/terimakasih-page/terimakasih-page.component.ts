import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-terimakasih-page',
  templateUrl: './terimakasih-page.component.html',
  styleUrls: ['./terimakasih-page.component.scss']
})
export class TerimakasihPageComponent implements OnInit {
  private _trialEndsAt;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {

    this._trialEndsAt = '2018-07-12 00:00:00';
    console.log(this.router.getNavigatedData());
  }
}
