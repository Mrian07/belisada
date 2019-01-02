import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction/transaction.service';
import { OrderStatusPaid, ContentOrderStatusPaid, CartItemsPaid } from '@belisada/core/models/transaction/transaction.model';
import { ReviewService } from '../../../core/services/review/review.service';
import { ListReview, ListReviewReq } from '@belisada/core/models/review/review.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PaymentService } from '../../../core/services/payment/payment.service';
import { PaymentList } from '@belisada/core/models/payment/payment.model';
import swal from 'sweetalert2';
import mct from 'madrick-countdown-timer';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RatingValidators } from '../star-rating/rating-validators';
import { UserService } from '@belisada/core/services';
import { LoadingService } from '@belisada/core/services/globals/loading.service';

@Component({
  selector: 'app-order-status-paid',
  templateUrl: './order-status-paid.component.html',
  styleUrls: ['./order-status-paid.component.scss']
})
export class OrderStatusPaidComponent implements OnInit {
  review: ListReview[];
  list: OrderStatusPaid[];
  transactionDetail: OrderStatusPaid = new OrderStatusPaid();
  product: CartItemsPaid = new CartItemsPaid();
  status: 'ALL';
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

  proddetail: ContentOrderStatusPaid = new ContentOrderStatusPaid();
  lastPage: number;
  currentPage: number;
  pages: any = [];
  x: any;

  countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    status: 0,
    message: ''
};

  orderNumber: number;
  itemCartId: number;
  showDialogKonfirm: boolean;
  a: number;
  reviewForm: FormGroup;
  prodId: number;
  showDialogReview: boolean;
  showDialogDetail: boolean;

  constructor(
    private reviewService: ReviewService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
  ) { this.list = []; }



  ngOnInit() {
    this.imgBuktiTransfer = 'assets/img/add-product.png';
    this.isLoading = true;
    this.createFormControls();
    this.statusFlag();
    this.isForm = true;
    this.isPilih = true;
    this.allPayment();

    mct.countdown('Jan 5, 2019 13:47:25', (countdown) => {
      // countdown = {
      //   days, hours, minutes, seconds,
      //   status [0 -> expired / 1 -> counting],
      //   message ['EXPIRED' / 'COUNTING']
      // }

      this.countdown = countdown;
  });
  this.activatedRoute.queryParams.subscribe((queryParam) => {
    this.currentPage = (queryParam.page) ? queryParam.page : 1;
    this.status = (queryParam.status) ? queryParam.status : 'ALL';
    this.orderListPaid((queryParam.status) ? queryParam.status : 'ALL');
  });
  }

  statusFlag() {
    this.openDetail = false;
    this.isForm = false;
    this.isSuccess = false;
    this.isPilih = false;
    this.isSent = false;
    this.isEmpty = false;
  }

  orderListPaid(statusOrderCode?: number) {
    const queryParams = {
      itemperpage: 10,
      page: this.currentPage,
      transaction_status: statusOrderCode
    };

    this.transactionService.getOrderPaid(queryParams).subscribe(respon => {
      this.proddetail = respon;
      this.list = respon.content;
      console.log('helo', this.proddetail.content);
      console.log('as', this.proddetail);
      this.proddetail = respon;
      this.a = respon.totalElements;
      this.pages = [];
      this.lastPage = this.proddetail.totalPages;
      for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
        if (r > 0 && r <= this.proddetail.totalPages) {
          this.pages.push(r);
        }
      }
      this.isLoading = false;
    });
  }

  createFormControls() {
    this.reviewForm = this.fb.group({
      star: new FormControl('', RatingValidators.required),
      message: new FormControl('', Validators.required),
      productId: new FormControl('', Validators.required)
    });
  }

  // ratingComponentClick(clickObj: any): void {
  //   const item = this.review.find(((i: any) => i.productId === clickObj.itemId));
  //   if (!!item) {
  //     item.star = clickObj.rating;
  //   }

  // }

  onSubmit(productId) {
    this.reviewForm.patchValue({
      productId: productId
    });
    const _data: ListReviewReq = new ListReviewReq();
    // if (this.prodId) { _data.productId = this.prodId; }
    _data.star = this.reviewForm.controls['star'].value;
    _data.message = this.reviewForm.controls['message'].value;
    _data.productId = this.reviewForm.controls['productId'].value;
    this.reviewService.createReview(_data).subscribe(data => {
      this.loadingService.hide();
      swal(
        'Sukses',
        'Terimakasih atas penilaian Anda.',
        'success'
      );
    });
    this.reviewForm.reset();
    this.showDialogReview = false;
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

  complaint(e) {
    this.router.navigateByUrl('/buyer/bantuan?id=' + e);
  }

  backToOrder() {
    this.showDialogDetail = false;

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

  confirm(paymentNumber) {
    this.router.navigate(['/buyer/confirmation/' + paymentNumber]);
    // this.router.navigate(['/buyer/confirmation'], { queryParams: { paymentNumber: paymentNumber } });
  }

  receiptConfirmation(orderNumber) {
    const data = {
      orderNumber: orderNumber
    };
    this.transactionService.itemsReceived(data).subscribe(response => {
      swal(
        (response.status === 1) ? 'Success' : 'Error',
        response.message,
        (response.status === 1) ? 'success' : 'error'
      );
      this.orderListPaid();
      console.log('response: ', response);
    });
    this.showDialogKonfirm = false;
  }

  alertConfirmation(orderNumber) {
    this.orderNumber = orderNumber;
  }

  alertReview(orderNumber, itemListProduct) {
    this.product = itemListProduct;
    this.orderNumber = orderNumber;
    this.showDialogReview = !this.showDialogReview;
  }

  // alertDetail(orderNumber, item, itemListProduct) {
  //   this.list = item;
  //   this.product = itemListProduct;
  //   this.orderNumber = orderNumber;
  //   this.showDialogDetail = !this.showDialogDetail;
  // }

  openOS(item) {
    this.transactionDetail = item;
    this.showDialogDetail = !this.showDialogDetail;
  }

  closeShowDialogKonfirm() {
    this.showDialogKonfirm = false;
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.proddetail.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/buyer/order'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

}
