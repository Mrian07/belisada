import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-discussion-product',
  templateUrl: './discussion-product.component.html',
  styleUrls: ['./discussion-product.component.scss']
})
export class DiscussionProductComponent implements OnInit {
  storeImgDiscussion: string;
  constructor() {
    this.storeImgDiscussion = environment.thumborUrl + 'unsafe/fit-in/45x45/center/filters:fill(fff)/';
   }

  ngOnInit() {
  }

}
