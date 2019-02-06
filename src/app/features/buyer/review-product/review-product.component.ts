import { Component, OnInit } from '@angular/core';
import { ReviewService } from '@belisada/core/services/review/review.service';
import { ReviewBuyer } from '../../../core/models/review/review.model';
import { Router, ActivatedRoute, Params, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss']
})
export class ReviewProductComponent implements OnInit {

  reviewBuyer = new ReviewBuyer();

  constructor(
    private reviewService: ReviewService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadData();
    console.log('gaban ini');
  }

  loadData() {
    const queryParams = {
      itemperpage: 10,
      page: 1
    };

    this.reviewService.getReviewBuyer(queryParams).subscribe(response => {
      console.log('data', response);
      this.reviewBuyer = response;
    });
  }

  detail(id, name) {
    this.router.navigate(['/product/product-detail/' + id + '/' + name]);
  }

}
