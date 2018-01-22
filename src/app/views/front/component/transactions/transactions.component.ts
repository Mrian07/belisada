import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../../core/service/transactions/transactions';
import { ActivatedRoute } from '@angular/router/';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  updateImg: Boolean = false;
  userImage: any;
  fm: any = {};
  orderId: any;
  success: Boolean;

  constructor(private transactions: TransactionsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.queryParamMap.get('key');
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

  uploadBukti() {
    const data = {
      orderNumber: this.orderId,
      imageEvidence: this.fm.imageID
    };
    this.transactions.completions(data).subscribe( result => {
    //  console.log(result);
      if (result.status === '1') {
        this.success = true;
      }
    });
  }

}
