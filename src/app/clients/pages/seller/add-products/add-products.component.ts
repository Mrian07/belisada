import { Component, OnInit, HostListener } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { SearchService } from '../../../../servers/service/search/search.service';
import { CategoryService } from '../../../../servers/service/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from 'rxjs/Observable';
import { Search } from '../../../../servers/model/search';
import { StoreService } from '../../../../servers/service/store/store.service';
import { AddproductService } from '../../../../servers/service/addproduct/addproduct.service';
import swal from 'sweetalert2';

interface AppState {
  message: any;
}

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})

export class AddProductsComponent implements OnInit {

  message$: Observable<Search>;


  editid: any;
  condition: string;
  selectProd: object;
  selectCats: any;
  selectedBrands: string;
  selectedCategory: string;
  selectedSubCategory: string;
  selectedSubCategories: string;
  selectCondition: any;
  results = [];
  category = [];
  subcategory = [];
  subcategories? = [];
  brands = [];
  categorySelect: Boolean = false;
  keys: string;
  description: string;
  price: number;
  weight: number;
  imageurl: string;
  editMode: Boolean = true;
  toggle: Boolean = false;
  productId: number;
  storeId: number;


    constructor(private searchService: SearchService, private categoryService: CategoryService,
      private route: ActivatedRoute, private storeService: StoreService, private addService: AddproductService) {
      this.route.params.subscribe( id => {
        this.editid = id;
      });
    }


  ngOnInit() {

    this.getCategory();
    this.getBrands();
    this.getStore();
    this.condition = 'baru';
    if (this.editid.id === 'add' ) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  getCategory() {
    this.categoryService.CategoryOne().subscribe(data => {
      this.category = data;
    });
  }

  openDrops() {
    this.toggle = true;
  }

  toggleBrands() {

    this.toggle = true;
  }

  blurs() {
    this.toggle = false;
  }

  selectCategory(id: number) {
    this.categoryService.CategoryTwo(id).subscribe(data => {
      this.subcategory = data;
    });
  }

  selectSubCategory(id: number) {
    this.categoryService.CategoryThree(id).subscribe(data => {
      this.subcategories = data;
    });
  }

  selectSubCategories(id: number) {
    console.log(id);
  }

  search(event) {
    const key = event.target.value;
    this.searchService.search(key).subscribe(data => {
      this.results = data;
    });
  }

  productSelected(hasil: any) {
    this.selectedCategory = hasil.category1Name;
    this.selectedSubCategory = hasil.category2Name;
    this.selectedSubCategories = hasil.category3Name;
    this.selectedBrands = hasil.brandname;
    this.results = [];
    this.selectCats = hasil.name;
    this.price = hasil.pricelist;
    this.description = hasil.description;
    this.imageurl = hasil.imageurl;
    this.weight = hasil.weight;
    this.toggle = false;
    this.productId = hasil.productId;
    console.log(hasil);
  }
  getBrands() {
    this.categoryService.BrandCategory().subscribe(data => {
      this.brands = data;
      this.toggle = false;
    });
  }
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    this.results = [];

  }

  getStore() {
    const user = JSON.parse(localStorage.user);
    const token = user.token;
    this.storeService.getAll({'token': token}).subscribe(response => {
      console.log('getAllStore response: ', response);
      this.storeId = response[0].mBpartnerStoreId;
    });
  }


  addProducts() {
    const productData = {
      pricelist: this.price,
      description: this.description,
      productId: this.productId,
      mBpartnerStoreId: this.storeId
    };
    console.log(productData);
    this.addService.AddProduct(productData).subscribe(data => {
      console.log(data);
      if (data.status === '1') {
        swal(
          'Produk berhasil di tambahkan!',
          'success'
        ).then((result) => {
          this.clearAll();
        });
      } else {
      }
    });
  }

  clearAll() {
    this.selectedCategory = '';
    this.selectedSubCategory = '';
    this.selectedSubCategories = '';
    this.selectedBrands = '';
    this.results = [];
    this.selectCats = '';
    this.price = 0 ;
    this.description = '';
    this.imageurl = undefined;
    this.weight = 0;
    this.toggle = false;
    this.productId = 0;
    this.selectedBrands = '';
  }

}
