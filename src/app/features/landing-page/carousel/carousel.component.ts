import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() images: any[] = [];

  // index = 0;
  // speed = 4000;
  // infinite = true;
  // direction = 'right';
  // directionToggle = true;
  // autoplay = true;

  constructor() { }

  ngOnInit() {
  }
}
