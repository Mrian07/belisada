import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../servers/service/search/search.service';
import { CategoryService } from '../../../../servers/service/category/category.service';
import { Search } from '../../../../servers/model/search';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})

export class AddProductsComponent implements OnInit {

  constructor(private searchService: SearchService, private categoryService: CategoryService) {

  }

  condition: string;
  results: Search[];
  category = [];
  subcategory = [];
  subcategories = [];
  categorySelect: Boolean = false;
  selectedOption: string;
  keys: string;

  ngOnInit() {
    this.getCategory();

  }

  search(event) {
    const key = event.target.value;
    this.searchService.search(key).subscribe(data => {
      this.results = data;
    });
  }

  selectProduct(id: number) {

    this.categoryService.getAll().subscribe(data => {
      data.forEach(element => {
        if ( element.categoryParentId === id ) {
          const subcat = element.c2;
          console.log(subcat);
          this.subcategory = element.c2;
        }
      });
    });
  }

  getCategory() {
    this.categoryService.getAll().subscribe(data => {
      console.log(data);
      this.category = data;
    });
  }
  subCategory(id) {
    this.categoryService.getOne(id).subscribe(data => {
      console.log(data);
     // this.subcategory = data;
    });
  }

  blur() {
    this.results = [];
    this.category = [];
  }

}
