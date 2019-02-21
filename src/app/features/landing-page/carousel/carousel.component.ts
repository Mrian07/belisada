import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  // @Input() images: any[] = [{
  //   url: 'https://files.slack.com/files-pri/TA40CF02U-FG9UPLM33/image_253.png',
  //   title: 'iPad'
  // }];

  index = 1;
  speed = 4000;
  infinite = true;
  direction = 'right';
  directionToggle = true;
  autoplay = true;
  avatars = '123'.split('').map((x, i) => {
    const num = i;
    const imageUrls = [
      'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg',
      'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg' ,
      'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg'
    ];
    // const num = Math.floor(Math.random() * 1000);
    return {
      url: 'https://files.slack.com/files-pri/TA40CF02U-FG9UPLM33/image_253.png',
      title: `Images`
    };
  });

  constructor() { }
  // click(i) {
  //   alert(`${i}`);
  // }
  ngOnInit() {
  }
}