import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-discussion-review',
  templateUrl: './discussion-review.component.html',
  styleUrls: ['./discussion-review.component.scss']
})
export class DiscussionReviewComponent implements OnInit {

  tabOrder = 'diskusi';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe((queryParam) => {
      this.tabOrder = (queryParam.status) ? queryParam.status : 'diskusi';
    });
  }

  ngOnInit() {
  }

  tab(data) {
    this.tabOrder = data;
    this.router.navigate(['/buyer/diskusi-review'], { queryParams: {page: 1, status: data}, queryParamsHandling: 'merge' });
  }

}
