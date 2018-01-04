import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/service/category/category.service';
import { Category2 } from '../../../../core/model/category2';
// import { CategoryView } from '../../../../core/model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  // categoryView: CategoryView;
  level_3: Category2[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.CategoryThree(1000475).subscribe(data => {
      this.level_3 = data;
      console.log('ini', data);
    });
  }

}
