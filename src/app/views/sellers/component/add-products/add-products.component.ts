import { Component, ChangeDetectionStrategy, OnInit, HostListener } from '@angular/core';
import { StoreModule, Store, ActionsSubject } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import swal from 'sweetalert2';
import { Search } from '../../../../core/model/search';
import { SearchService } from '../../../../core/service/search/search.service';
import { CategoryService } from '../../../../core/service/category/category.service';
import { StoreService } from '../../../../core/service/store/store.service';
import { AddproductService } from '../../../../core/service/addproduct/addproduct.service';
import * as fromActions from '../../../../store/actions';
import * as fromProduct from '../../../../store/reducers';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { Products } from '../../../../store/reducers';
import { ShareService } from '../../../../core/service/shared.service';

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
  productName: any;
  results = [];
  category = [];
  subcategory = [];
  subcategories? = [];
  brands = [];
  categorySelect: Boolean = false;
  keys: string;
  description: any;
  price: number;
  specialPrice: any;
  weight: number;
  panjang: number;
  lebar: number;
  tinggi: number;
  imageurl: string;
  editMode: Boolean = true;
  toggle: Boolean = false;
  productId: number;
  storeId: number;
  redirectSub: Subscription;
  editSub: Subscription;
  editData: any;
  asap: any;
  quantity: any;
  selectedQuantity: any;

    constructor(private searchService: SearchService, private categoryService: CategoryService,
      private route: ActivatedRoute, private router: Router, private storeService: StoreService,
      private addService: AddproductService,
      private actionsSubject: ActionsSubject,
      private store: Store<fromProduct.Products>,
      private title: Title,
      private shared: ShareService
    ) {
      this.route.params.subscribe( id => {
        this.editid = id;
      });
      const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      this.quantity = quantity;
    }


  ngOnInit() {
    this.title.setTitle('Belisada Seller - Add Product');
    this.getCategory();
    this.getBrands();
    this.getStore();
    this.condition = 'baru';
    if (this.editid.id === 'add' ) {
      this.editMode = false;
    } else {
      this.editMode = true;
      this.editData = this.shared.shareData;
      this.productSelected(this.shared.shareData);
    }
    this.redirectSub = this.actionsSubject
        .asObservable()
        .filter(action => action.type === fromActions.ADDPRODUCTSUCCESS)
        .subscribe((action: fromActions.AddProductSuccess) => {
           swal(
                'Produk berhasil di tambahkan!',
                'success'
              ).then((result) => {
                this.clearAll();
              });
        });
    this.editSub = this.actionsSubject
    .asObservable()
    .filter(action => action.type === fromActions.EDITPRODUCTSUCCESS)
    .subscribe((action: fromActions.EditProductSuccess) => {
        swal(
            'Produk berhasil di Perbaharui!',
            'success'
          ).then((result) => {
            this.clearAll();
            this.shared.shareData = '';
            this.router.navigateByUrl('/seller/my-store');
          });
    });
  }

  getCategory() {
    this.categoryService.CategoryOne().subscribe(data => {
      this.category = data;
    });
  }

  getQuantity(q) {
    this.selectedQuantity = q;
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
    //console.log(id);
  }

  search(event) {
    const key = event.target.value;
    if (key === '') {
      this.results = [];
    }else {
      this.searchService.search(key).subscribe(data => {
        this.results = data;
      });
    }
  }

  productSelected(hasil: any) {
    console.log(hasil);
    this.productName = hasil.name;
    this.selectedCategory = hasil.category1Name;
    this.selectedSubCategory = hasil.category2Name;
    this.selectedSubCategories = hasil.category3Name;
    this.selectedBrands = hasil.brandname;
    this.results = [];
    this.selectCats = hasil.name;
    this.price = hasil.pricelist;
    this.specialPrice = hasil.specialPrice;
    this.description = hasil.description;
    this.imageurl = hasil.imageurl;
    this.weight = hasil.weight;
    this.toggle = false;
    this.productId = hasil.productId;
    this.lebar = hasil.dimensionswidth;
    this.tinggi = hasil.dimensionsheight;
    this.panjang = hasil.dimensionslength;
    this.asap = hasil.isAsapShipping;
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
    this.storeService.getAll().subscribe(response => {
      this.storeId = response[0].mBpartnerStoreId;
    });
  }


  addProducts() {
    console.log(this.selectedQuantity);
    if ( this.productId === undefined) {
      swal('Nama Product harus diisi');
    }else {
      const productData = {
        pricelist: this.price,
        description:'',
        productId: this.productId,
        mBpartnerStoreId: this.storeId,
        weight: this.weight,
        dimensionswidth: this.lebar,
        dimensionslength: this.panjang,
        dimensionsheight: this.tinggi,
        specialPrice: this.specialPrice,
        isAsapShipping: 'N',
        stok: this.selectedQuantity,
        tag: [this.productName]
      };
    this.store.dispatch(new fromActions.AddProduct(productData));
    }
  }

  addProductsAsap() {
    console.log(this.description);
    if ( this.productId === undefined) {
      swal('Nama Product harus diisi');
    }else {
      const productData = {
        pricelist: this.price,
        description: '',
        productId: this.productId,
        mBpartnerStoreId: this.storeId,
        weight: this.weight,
        dimensionswidth: this.lebar,
        dimensionslength: this.panjang,
        dimensionsheight: this.tinggi,
        specialPrice: this.specialPrice,
        isAsapShipping: 'Y',
        stok: this.selectedQuantity,
        tag: [this.productName]
      };
      this.store.dispatch(new fromActions.AddProduct(productData));
    }
  }

  updateProducts() {
    if ( this.productId === undefined) {
      swal('Nama Product harus diisi');
    }else {
      const productData = {
        pricelist: this.price,
        description: this.description,
        productId: this.productId,
        mBpartnerStoreId: this.storeId,
        weight: this.weight,
        dimensionswidth: this.lebar,
        dimensionslength: this.panjang,
        dimensionsheight: this.tinggi,
        tag: [this.productName]
      };
      this.store.dispatch(new fromActions.EditProduct(productData));
    }
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
    this.panjang = 0;
    this.lebar = 0;
    this.tinggi = 0;
    this.toggle = false;
    this.productId = 0;
    this.selectedBrands = '';
  }

}
