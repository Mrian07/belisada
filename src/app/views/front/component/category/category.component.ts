import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/service/category/category.service';
import { Category2 } from '../../../../core/model/category2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  // categoryView: CategoryView;
  level_3: Category2[];
  alias: any;
  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    this.route.params.subscribe( id => {
      this.alias = id;
    });
  }

  ngOnInit() {
    this.categoryService.CategoryThree(1000475).subscribe(data => {
      this.level_3 = data;
      console.log('ini', data);
    });
  }

}
