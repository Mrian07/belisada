import { SearchService } from './../../../../core/service/search/search.service';
import { Category2 } from './../../../../core/model/category2';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/service/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  level_3: Category2[];
  m_product_category_id: any;
  queryParams: any = {};
  alias: Category2 = new Category2();

  constructor(private categoryService: CategoryService, private route: ActivatedRoute,  private router: Router,
  private search: SearchService) {
    this.route.params.subscribe( params => {
      this.m_product_category_id = params.id;
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.m_product_category_id = params.id;
      this.categoryService.CategoryThree(this.m_product_category_id).subscribe(data => {
        this.level_3 = data;
      });
    });
  }
  dapatkanList(id) {
    this.queryParams =  {
      parent : 3,
      id : id
    };
    this.router.navigate(['/product-list'], { queryParams: this.queryParams });
  }
  reloadr() {
    location.reload();
  }

}
