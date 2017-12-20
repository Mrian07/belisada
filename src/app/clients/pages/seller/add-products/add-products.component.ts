import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../servers/service/search/search.service';
import { CategoryService } from '../../../../servers/service/category/category.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})

export class AddProductsComponent implements OnInit {
  editid: any;
  condition: string;
  selectProd: object;
  selectedCategory: string;
  selectedOption: string;
  results = [];
  category = [];
  subcategory = [];
  subcategories? = [];
  categorySelect: Boolean = false;
  keys: string;
  description: string;
  price: number;
  weight: number;
  imageurl: string;
  editMode: Boolean = true;

  constructor(private searchService: SearchService, private categoryService: CategoryService,
  private route: ActivatedRoute) {
    this.route.params.subscribe( id => {
      this.editid = id;
    });
  }


  ngOnInit() {
    this.getCategory();
    this.condition = 'baru';
    if (this.editid.id === 'add' ) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  search(event) {
    const key = event.target.value;
    this.searchService.search(key).subscribe(data => {
      this.results = data;
    });
  }

  productSelected(hasil) {
    this.selectProd = hasil.name;
    this.results = [];
    this.selectedCategory = hasil.category;
    this.price = hasil.pricelist;
    this.description = hasil.description;
    this.imageurl = hasil.imageurl;
    this.weight = hasil.weight;
  }

  selectCondition() {
  }

  selectProduct(id: number) {
    this.categoryService.getAll().subscribe(data => {
      data.forEach(element => {
        if ( element.categoryParentId === id ) {
          const subcat = element.c2;
          this.subcategory = subcat;
        }
      });
    });
  }

  getCategory() {
    this.categoryService.getAll().subscribe(data => {
      this.category = data;
    });

  }

  blur(hasil) {
    this.results = [];
    this.category = [];
  }

}
