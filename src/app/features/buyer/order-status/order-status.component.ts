import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction/transaction.service';
import { OrderStatus, ContentOrderStatus } from '@belisada/core/models/transaction/transaction.model';
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
// interface ICompany {
//   id: number;
//   rating: number;
//   contact: string;
//   company: string;
// }
@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  // review: ListReview[];
  private _order: ContentOrderStatus;
  private _currentPage: number;

  get order(): ContentOrderStatus {
    return this._order;
  }

  @Input()
  set order(order: ContentOrderStatus) {
    this._order = order;
    if (typeof this._order.content === 'undefined') return;
    const orderList =  this._order.content.filter(x => x.expiredConfirmationPaymentBuyerDate !== '');
    orderList.forEach((x) => {
      mct.countdown(x.expiredConfirmationPaymentBuyerDate, (countdown) => {
        orderList.find(i => i.paymentNumber === x.paymentNumber).countdown = countdown;
      });
    });
    this.pages = [];
    this.lastPage = this._order.totalPages;
    for (let r = (this._currentPage - 3); r < (this.currentPage - (-4)); r++) {
      if (r > 0 && r <= this._order.totalPages) {
        this.pages.push(r);
      }
    }
  }

  get currentPage(): number {
    return this._currentPage;
  }

  @Input()
  set currentPage(currentPage: number) {
    this._currentPage = currentPage;
  }

  // SECTION paging
  public pages: any = [];
  public lastPage: number;

  // SECTION show modals
  public showPaymentMethodModal: Boolean = false;

  // SECTION
  public transactionId;
  public openDetail: Boolean = false;
//   status: 'ALL';
//   openDetail: boolean;
//   updateImg: Boolean = false;
//   imageDataUrl: string;
//   imgBuktiTransfer: string;
//   fm: any = {};
//   isForm: boolean;
//   isSuccess: boolean;
//   showDialog: Boolean = false;
//   isPilih: boolean;
//   isSent: boolean;
//   isLoading: boolean;
//   isEmpty: boolean;
//   transactionId: number;
  listPayment: PaymentList[];
//   regSuccess: any;
//   showDialogRek: any;

//   proddetail: ContentOrderStatus = new ContentOrderStatus();
//   lastPage: number;
//   currentPage: number;

//   x: any;

//   countdown = {
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//     status: 0,
//     message: ''
// };

//   orderNumber: number;
//   itemCartId: number;
//   showDialogKonfirm: boolean;
//   a: number;
//   reviewForm: FormGroup;
//   prodId: number;
//   showDialogReview: boolean;
//   showDialogDetail: boolean;

  // ratingClicked: number;
  // itemIdRatingClicked: string;
  // items: ICompany[] = [
  //   { 'id': 0, 'rating': 0, 'contact': 'Dennis Phillips', 'company': 'PROFLEX' }
  // ];
  // ratingComponentClick(clickObj: any): void {
  //   const item = this.items.find(((i: any) => i.id === clickObj.itemId));
  //   if (!!item) {
  //     item.rating = clickObj.rating;
  //     this.ratingClicked = clickObj.rating;
  //     this.itemIdRatingClicked = item.company;
  //   }

  // }

  constructor(
    // private reviewService: ReviewService,
    // private loadingService: LoadingService,
    // private fb: FormBuilder,
    // private _transactionService: TransactionService,
    private _router: Router,
    // private activatedRoute: ActivatedRoute,
    private _paymentService: PaymentService,
  ) {
    // this.list = [];
    // this.showDialogDetail = false;
  }



  ngOnInit() {
    this._allPayment();
    // this.imgBuktiTransfer = 'assets/img/add-product.png';
    // this.isLoading = true;
    // this.createFormControls();
    // this.statusFlag();
    // this.isForm = true;
    // this.isPilih = true;
    // this.allPayment();

    // mct.countdown('Jan 5, 2019 13:47:25', (countdown) => {
      // countdown = {
      //   days, hours, minutes, seconds,
      //   status [0 -> expired / 1 -> counting],
      //   message ['EXPIRED' / 'COUNTING']
      // }

      // this.countdown = countdown;
  // });
  // this.activatedRoute.queryParams.subscribe((queryParam) => {
  //   this.currentPage = (queryParam.page) ? queryParam.page : 1;
  //   this.status = (queryParam.status) ? queryParam.status : 'ALL';
  //   this.orderList((queryParam.status) ? queryParam.status : 'ALL');
  // });
  }

  // statusFlag() {
  //   this.openDetail = false;
  //   this.isForm = false;
  //   this.isSuccess = false;
  //   this.isPilih = false;
  //   this.isSent = false;
  //   this.isEmpty = false;
  // }

  // orderList(statusOrderCode?: any) {
  //   const queryParams = {
  //     itemperpage: 10,
  //     page: this.currentPage,
  //     transaction_status: statusOrderCode
  //   };

  //   this.transactionService.getOrder(queryParams).subscribe(respon => {
  //     const b =  respon.content.filter(x => x.expiredConfirmationPaymentBuyerDate !== '');
  //     this.proddetail = respon;
  //     this.list = respon.content;
  //     b.forEach((x) => {
  //       mct.countdown(x.expiredConfirmationPaymentBuyerDate, (countdown) => {
  //         this.proddetail.content.find(i => i.paymentNumber === x.paymentNumber).countdown = countdown;
  //       });
  //     });
  //     this.proddetail = respon;
  //     this.a = respon.totalElements;
  //     this.pages = [];
  //     this.lastPage = this.proddetail.totalPages;
  //     for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
  //       if (r > 0 && r <= this.proddetail.totalPages) {
  //         this.pages.push(r);
  //       }
  //     }
  //     this.isLoading = false;
  //   });
  // }

  // createFormControls() {
  //   this.reviewForm = this.fb.group({
  //     star: new FormControl('', RatingValidators.required),
  //     message: new FormControl('', Validators.required),
  //     productId: new FormControl('', Validators.required)
  //   });
  // }

  // ratingComponentClick(clickObj: any): void {
  //   const item = this.review.find(((i: any) => i.productId === clickObj.itemId));
  //   if (!!item) {
  //     item.star = clickObj.rating;
  //   }

  // }

  // onSubmit(productId) {
  //   this.loadingService.show();
  //   this.reviewForm.patchValue({
  //     productId: productId
  //   });
  //   const _data: ListReviewReq = new ListReviewReq();
    // if (this.prodId) { _data.productId = this.prodId; }
  //   _data.star = this.reviewForm.controls['star'].value;
  //   _data.message = this.reviewForm.controls['message'].value;
  //   _data.productId = this.reviewForm.controls['productId'].value;
  //   this.reviewService.createReview(_data).subscribe(data => {
  //     this.loadingService.hide();
  //     this.orderList(this.status);
  //     swal(
  //       'Sukses',
  //       'Terimakasih atas penilaian Anda.',
  //       'success'
  //     );
  //   });
  //   this.reviewForm.reset();
  //   this.showDialogReview = false;
  // }

  openOS(status, transactionId) {
    if (status === true) {
      this.transactionId = transactionId;
      this.openDetail = false;
    } else {
      this.transactionId = transactionId;
      this.openDetail = true;
    }
  }

  // setCanvas(e, imageBuktiTransfer) {
  //   if (!this.updateImg) { return false; }
  //   const cnv = document.createElement('canvas');
  //   const el = e.target;
  //   const w = el.width;
  //   const h = el.height;

  //   cnv.width = w;
  //   cnv.height = h;
  //   cnv.getContext('2d').drawImage(el, 0, 0, w, h);

  //   this.fm[imageBuktiTransfer] = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');

  //   const request = {
  //     imageBuktiTransfer: this.imageDataUrl
  //   };

  // }

  // complaint(e) {
  //   this.router.navigateByUrl('/buyer/bantuan?id=' + e);
  // }

  // backToOrder() {
  //   this.router.navigateByUrl('/buyer/order?page=1&status=181');
  //   this.showDialogReview = false;
  // }

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

  // takeId(transactionId, imgBuktiTransfer) {
  //   this.transactionId = transactionId;
  //   this.imgBuktiTransfer = imgBuktiTransfer;
  // }
  // uploadBuktiTransfer() {

  //   const request = {
  //     imageUrl: this.imageDataUrl,
  //     transactionId:  this.transactionId
  //   };

  //   this.transactionService.uploadImgTransfer(request).subscribe(respon => {
  //     this.statusFlag();
  //     this.showDialog = false;
  //     this.isForm = true;
  //     this.isPilih = true;
  //   });

  // }

  // ANCHOR: in the right place
  detailInvoice(id) {
    this._router.navigate(['/invoice/' + id ]);
  }

  // TODO: move to order.component.ts
  private _allPayment() {
    this._paymentService.getPayment().subscribe(respon => {
      this.listPayment = respon[0].data;
    });
  }

  // ANCHOR: in the right place
  confirm(paymentNumber) {
    this._router.navigate(['/buyer/confirmation/' + paymentNumber]);
    // this.router.navigate(['/buyer/confirmation'], { queryParams: { paymentNumber: paymentNumber } });
  }

  // receiptConfirmation(orderNumber) {
  //   const data = {
  //     orderNumber: orderNumber
  //   };
  //   this.transactionService.itemsReceived(data).subscribe(response => {
  //     swal(
  //       (response.status === 1) ? 'Success' : 'Error',
  //       response.message,
  //       (response.status === 1) ? 'success' : 'error'
  //     );
  //     this.orderList();
  //   });
  //   this.showDialogKonfirm = false;
  // }

  // alertConfirmation(orderNumber) {
  //   this.orderNumber = orderNumber;
  // }

  // alertReview(orderNumber) {
  //   this.orderNumber = orderNumber;
  // }

  // closeShowDialogKonfirm() {
  //   this.showDialogKonfirm = false;
  // }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.order.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this._router.navigate(['/buyer/order'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

}
