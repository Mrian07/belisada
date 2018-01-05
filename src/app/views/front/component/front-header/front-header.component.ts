import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../core/model/category';
import { CategoryService } from '../../../../core/service/category/category.service';
import { SearchService } from '../../../../core/service/search/search.service';
import { Search } from '../../../../core/model/search';
@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent implements OnInit {

  categorySearch: Category[];
  selectedSearchCategory: any;
  results = [];
  imgTop: any;
  selectCatsK: any;
  constructor(private categoryService: CategoryService, private searchService: SearchService) { }

  ngOnInit() {
    this.loadDataCategorySearch();
    console.log('kampret di home search');
  }

  searchK(event) {
    const key = event.target.value;
    if (key === '') {
      this.results = [];
    }else {
      this.searchService.search(key).subscribe(data => {
        this.results = data;
      });
    }
  }
  loadDataCategorySearch() {
    this.categoryService.CategoryOne().subscribe(data => {
      this.categorySearch = data;
    });
  }

}
