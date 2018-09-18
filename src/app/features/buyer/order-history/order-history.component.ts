import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../../core/services/transaction/transaction.service';
import { OrderStatus, UploadImgTransfer, ContentOrderStatus } from '@belisada/core/models/transaction/transaction.model';
import { PaymentService } from './../../../core/services/payment/payment.service';
import { PaymentList } from '@belisada/core/models/payment/payment.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  list: OrderStatus[];
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
  showDialogRek: any;
  transactionId: number;
  listPayment: PaymentList[];

  proddetail: ContentOrderStatus = new ContentOrderStatus();
  lastPage: number;
  currentPage: number;
  pages: any = [];

  constructor(private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService) {
    this.list = [];
  }

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
    this.activatedRoute.queryParams.subscribe((params: Params) => {

      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        itemperpage: 10,
        page: this.currentPage,
        ot: 'asc',
        transaction_status: 'HISTORY'
      };

      this.transactionService.getOrder(queryParams).subscribe(respon => {
        if (respon.content.length === 0 ) {
          this.isEmpty = true;
        }

        this.isLoading = false;
        this.list = respon.content;

        this.proddetail = respon;
        this.pages = [];
        this.lastPage = this.proddetail.totalPages;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.proddetail.totalPages) {
            this.pages.push(r);
          }
        }

      });
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

  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;
    console.log('image:', f);

    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      img.src = fr.result;
      that.imageDataUrl = fr.result;
    };
    fr.readAsDataURL(f);
    this.statusFlag();
    this.isForm = true;
    this.isSent = true;
  }

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
    });

  }

  allPayment() {
    this.paymentService.getPayment().subscribe(respon => {
    this.listPayment = respon[0].data;
    });
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.proddetail.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/buyer/order'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

}
