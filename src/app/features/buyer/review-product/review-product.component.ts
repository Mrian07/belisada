import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ReviewService } from '@belisada/core/services/review/review.service';
import { ReviewBuyer } from '../../../core/models/review/review.model';
import { Router, ActivatedRoute, Params, RouterStateSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@env/environment';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss']
})
export class ReviewProductComponent implements OnInit {
  imgProduct: string;
  storeImgDiscussion: string;
  storeImgDiscussionChild: string;

  reviewBuyer: ReviewBuyer  = new ReviewBuyer();

  currentPage: number;
  lastPage: number;
  pages: any = [];

  public Arr = Array;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private reviewService: ReviewService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.imgProduct = environment.thumborUrl + 'unsafe/fit-in/250x250/center/filters:fill(fff)/';
    this.storeImgDiscussion = environment.thumborUrl + 'unsafe/fit-in/100x100/center/filters:fill(fff)/';
    this.storeImgDiscussionChild = environment.thumborUrl + 'unsafe/fit-in/50x50/center/filters:fill(fff)/';
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];

      const queryParams = {
        itemperpage: 10,
        page: this.currentPage,
        status: 'review'
      };

      this.reviewService.getReviewBuyer(queryParams).subscribe(response => {
        this.reviewBuyer = response;

        console.log('reviewBuyer', this.reviewBuyer);

        this.pages = [];
          this.lastPage = this.reviewBuyer.totalPages;
          for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
            if (r > 0 && r <= this.reviewBuyer.totalPages) {
              this.pages.push(r);
            }
          }
      });

    });
  }

  detail(id, name) {
    this.router.navigate(['/product/product-detail/' + id + '/' + name]);
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.reviewBuyer.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/buyer/diskusi-review'], { queryParams: {page: page, status: 'review' }, queryParamsHandling: 'merge' }) ;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

}
