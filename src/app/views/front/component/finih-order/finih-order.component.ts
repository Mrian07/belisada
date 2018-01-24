import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-finih-order',
  templateUrl: './finih-order.component.html',
  styleUrls: ['./finih-order.component.scss']
})
export class FinihOrderComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Belisada - Finish Order');
    window.scrollTo(0, 0);
  }

}
