import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-buyer',
  templateUrl: './confirmation-buyer.component.html',
  styleUrls: ['./confirmation-buyer.component.scss']
})
export class ConfirmationBuyerComponent implements OnInit {

  updateImg: Boolean = false;
  imageTrans: string;
  fm: any = {};
  constructor() { }

  ngOnInit() {
  }

  setCanvas(e, newIMG) {
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.target;
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.fm[newIMG] = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');
  }

  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;

    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }

}
