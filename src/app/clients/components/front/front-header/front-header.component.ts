import { Component, OnInit } from '@angular/core';
import { CategorySearch } from './../../../../servers/model/category-search';
import { CategoryService } from '../../../../servers/service/category/category.service';
import { Category } from '../../../../servers/model/category';

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
