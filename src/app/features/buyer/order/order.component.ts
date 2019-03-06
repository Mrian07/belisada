import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@belisada/core/services/transaction/transaction.service';
import { ContentOrderStatus } from '@belisada/core/models/transaction/transaction.model';
import { LoadingService } from '@belisada/core/services/globals/loading.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public isLoading: Boolean = false;

  public activeTab: String = 'ALL';
  public currentPage: Number = 1;

  /**
   * variable that used in another component
   */
  public order: ContentOrderStatus = new ContentOrderStatus();

  constructor(
    private _loadingService: LoadingService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _transactionService: TransactionService
  ) {
    this._activatedRoute.queryParams.subscribe((queryParam) => {
      this.activeTab = (queryParam.status) ? queryParam.status : 'ALL';
      this.currentPage = (queryParam.page) ? queryParam.page : 1;
      if (this.activeTab === '133') this._orderList(this.activeTab);
    });
  }

  ngOnInit() {}

  public changeTab(data) {
    this.activeTab = data;
    this._router.navigate(['/buyer/order'], { queryParams: {page: 1, status: data}, queryParamsHandling: 'merge' });
  }

  /**
   * Get order list for order-status.component.ts
   * @param statusOrderCode
   */
  private _orderList(statusOrderCode?: any) {
    const queryParams = {
      itemperpage: 10,
      page: this.currentPage,
      transaction_status: statusOrderCode
    };
    this._loadingService.show();
    this._transactionService.getOrder(queryParams).subscribe(response => {
      this._loadingService.hide();
      this.order = response;
      // const b =  respon.content.filter(x => x.expiredConfirmationPaymentBuyerDate !== '');
      // this.proddetail = respon;
      // this.list = respon.content;
      // b.forEach((x) => {
      //   mct.countdown(x.expiredConfirmationPaymentBuyerDate, (countdown) => {
      //     this.proddetail.content.find(i => i.paymentNumber === x.paymentNumber).countdown = countdown;
      //   });
      // });
      // this.proddetail = respon;
      // this.a = respon.totalElements;
      // this.pages = [];
      // this.lastPage = this.proddetail.totalPages;
      // for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
      //   if (r > 0 && r <= this.proddetail.totalPages) {
      //     this.pages.push(r);
      //   }
      // }
      // this.isLoading = false;
    });
  }

}
