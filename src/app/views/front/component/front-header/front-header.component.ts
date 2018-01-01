import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../core/model/category';
import { CategoryService } from '../../../../core/service/category/category.service';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent implements OnInit {

  categorySearch: Category[];
  selectedSearchCategory: any;
  imgTop: any;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadDataCategorySearch();
  }

  loadDataCategorySearch() {
    this.categoryService.CategoryOne().subscribe(data => {
      this.categorySearch = data;
    });
  }

}
