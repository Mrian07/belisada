import { Category2 } from './../../../../core/model/category2';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/service/category/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  // categoryView: CategoryView;
  level_3: Category2[];
  m_product_category_id: any;
  alias: Category2 = new Category2();

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.m_product_category_id = params.id;
      // console.log('ah', this.m_product_category_id);
    });
  }

  ngOnInit() {
    this.categoryService.CategoryThree(this.m_product_category_id).subscribe(data => {
      this.level_3 = data;
      console.log('ini apa ya', this.level_3);
    });
  }
  dapatkanList() {
    console.log('sdsd');
    return false;
  }
  reloadr() {
    location.reload();
  }

}
