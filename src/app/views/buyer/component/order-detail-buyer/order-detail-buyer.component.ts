import { TransactionListService } from './../../../../core/service/transcations-list/transaction-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TrasnactionList } from '../../../../core/model/trasnaction-list';
@Component({
  selector: 'app-order-detail-buyer',
  templateUrl: './order-detail-buyer.component.html',
  styleUrls: ['./order-detail-buyer.component.scss']
})
export class OrderDetailBuyerComponent implements OnInit {
  cartItems: any;
  cart: TrasnactionList = new TrasnactionList();
  tsId: any;
  constructor( private router: Router, private route: ActivatedRoute, private tsBuyer: TransactionListService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.tsId = params.id;
      // console.log('pa', this.tsId);
      this.tsBuyer.getAll().subscribe(data => {
        // console.log('data', data);
        this.cart = data.find(x => x.transactionId == params.id);
        // console.log('this.cart', this.cart);
      });
    });
  }

}
