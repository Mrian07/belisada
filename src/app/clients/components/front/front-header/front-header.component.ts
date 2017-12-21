import { Component, OnInit } from '@angular/core';
import { CategorySearch } from './../../../../servers/model/category-search';
import { CategoryService } from '../../../../servers/service/category/category.service';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent implements OnInit {

  categorySearch: CategorySearch[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategorySearch().subscribe(data => {
      this.categorySearch = data;
    });
  }

}
