import { transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../../core/services/transaction/transaction.service';
import { OrderStatus, UploadImgTransfer } from '@belisada/core/models/transaction/transaction.model';
import { Router} from '@angular/router';
import { PaymentService } from './../../../core/services/payment/payment.service';
import { PaymentList } from '@belisada/core/models/payment/payment.model';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  list: OrderStatus[];
  // list: any[];
  status: string;
  base64Img: string;
  openDetail: boolean;
  updateImg: Boolean = false;
  imageDataUrl: string;
  imgBuktiTransfer: string;
  fm: any = {};
  isForm: boolean;
  isSuccess: boolean;
  showDialog: Boolean = false;
  isPilih: boolean;
  isSent: boolean;
  isLoading: boolean;
  isEmpty: boolean;
  transactionId: number;
  listPayment: PaymentList[];
  regSuccess: any;
  showDialogRek: any;


  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private paymentService: PaymentService,
  ) { this.list = []; }

  ngOnInit() {
    this.imgBuktiTransfer = 'assets/img/add-product.png';
    this.isLoading = true;
    this.statusFlag();
    this.isForm = true;
    this.isPilih = true;
    this.pendingOrder();
    this.allPayment();
  }

  statusFlag() {
    this.openDetail = false;
    this.isForm = false;
    this.isSuccess = false;
    this.isPilih = false;
    this.isSent = false;
    this.isEmpty = false;
  }

  pendingOrder() {
    this.status = 'PENDING';
    this.transactionService.getOrder(this.status).subscribe(respon => {

      if (respon.content.length === 0 ) {
        this.isEmpty = true;
      }
      this.isLoading = false;
      this.list = respon.content;
    });
  }

  openOS(status, transactionId) {
    if (status === true) {
      this.transactionId = transactionId;
      this.openDetail = false;
    } else {
      this.transactionId = transactionId;
      this.openDetail = true;
    }
  }

  setCanvas(e, imageBuktiTransfer) {
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.target;
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.fm[imageBuktiTransfer] = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');

    const request = {
      imageBuktiTransfer: this.imageDataUrl
    };

  }

  // setUrl(event, img) {
  //   const fr = new FileReader();
  //   const f = event.target.files[0];
  //   const that = this;

  //   if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
  //   fr.onload = function() {
  //     that.updateImg = true;
  //     img.src = fr.result;
  //     that.imageDataUrl = fr.result;
  //   };
  //   fr.readAsDataURL(f);
  //   this.statusFlag();
  //   this.isForm = true;
  //   this.isSent = true;
  // }

  takeId(transactionId, imgBuktiTransfer) {
    this.transactionId = transactionId;
    this.imgBuktiTransfer = imgBuktiTransfer;
  }
  uploadBuktiTransfer() {

    const request = {
      imageUrl: this.imageDataUrl,
      transactionId:  this.transactionId
    };

    this.transactionService.uploadImgTransfer(request).subscribe(respon => {
      this.statusFlag();
      this.showDialog = false;
      this.isForm = true;
      this.isPilih = true;
      this.pendingOrder();
    });

  }

  detailInvoice(id) {
    this.router.navigate(['/invoice/' + id ]);
  }

  allPayment() {
    this.paymentService.getPayment().subscribe(respon => {
    this.listPayment = respon[0].data;
    });
  }

  confirm() {
    this.router.navigate(['/buyer/confirmation']);
  }

}
