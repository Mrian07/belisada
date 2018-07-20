import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  tabOrder: string;
  constructor() { }

  ngOnInit() {
    this.tabOrder = 'tabInformation';
  }

  tab($data) {
    this.tabOrder = $data;
  }

}

