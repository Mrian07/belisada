import { ActivatedRoute, Router } from '@angular/router';
import { TransactionListService } from './../../../../core/service/transcations-list/transaction-list.service';
import { Component, OnInit } from '@angular/core';
import { TrasnactionList } from '../../../../core/model/trasnaction-list';

@Component({
  selector: 'app-review-buyer',
  templateUrl: './review-buyer.component.html',
  styleUrls: ['./review-buyer.component.scss']
})
export class ReviewBuyerComponent implements OnInit {
  cart: TrasnactionList = new TrasnactionList();
  tsId: any;
  constructor(private router: Router, private route: ActivatedRoute, private tsBuyer: TransactionListService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.tsId = params.id;
      this.tsBuyer.getAll().subscribe(data => {
        this.cart = data.find(x => x.transactionId === +params.id);
      });
    });
  }
  repiew(id) {
    this.router.navigate(['/buyer/ulasan/', id]);
  }

}
