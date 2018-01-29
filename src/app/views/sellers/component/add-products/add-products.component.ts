import { Component, ChangeDetectionStrategy, OnInit, HostListener, NgZone } from '@angular/core';
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
  courier: any;

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
  stok: number;
  id: any;
  test: any = {};
  selectedCountry: any;
  qtySeller: any;
  qtyOnHand: any;
  classification: any;
  show: Boolean;
  garansiDays: any;
  isGuarantee: any;
  guaranteeDays: any;
  news: any;
  selectedColor = [];
  warnanya = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'pulple', 'pink', 'brown', 'grey', 'black']

  countries = [
    {id: 0, name: '0' , selected: false},
    {id: 1, name: '1' , selected: false},
    {id: 2, name: '2' , selected: false},
    {id: 3, name: '3' , selected: false},
    {id: 4, name: '4' , selected: false},
    {id: 5, name: '5' , selected: false},
    {id: 6, name: '6' , selected: false},
    {id: 7, name: '7' , selected: false},
    {id: 8, name: '8' , selected: false},
    {id: 9, name: '9' , selected: false},
    {id: 10, name: '10' , selected: false},
  ];
    constructor(private searchService: SearchService, private categoryService: CategoryService,
      private route: ActivatedRoute, private router: Router, private storeService: StoreService,
      private addService: AddproductService,
      private actionsSubject: ActionsSubject,
      private store: Store<fromProduct.Products>,
      private title: Title,
      private shared: ShareService,
      private ngzone: NgZone
    ) {
      this.route.params.subscribe( id => {
        this.editid = id;
      });
      this.quantity = this.countries;
      //console.log(this.quantity);
    }


  ngOnInit() {
    this.title.setTitle('Belisada Seller - Add Product');
    this.getCategory();
    this.getBrands();
    this.getStore();
    this.garansiDays = 0;
    this.stok = 0;
    this.qtyOnHand = 0;
    this.classification = '01';
    this.condition = 'baru';
    if (this.editid.id === 'add' ) {
      this.editMode = false;
    } else {
      this.editMode = true;
      this.editData = this.shared.shareData;
      //console.log(this.editData);
      this.countries[this.editData.stock].selected = true;
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
            this.router.navigateByUrl('/seller/product-list');
          });
    });
  }

  onInput($event) {
    $event.preventDefault();
    this.stok = +$event.target.value;
  }
  garansi($event) {
    $event.preventDefault();
    this.garansiDays = +$event.target.value;
  }

  geClassification(id: number) {
    this.classification = id;
  }

  getCategory() {
    this.categoryService.CategoryOne().subscribe(data => {
      this.category = data;
    });
  }
  couriers($event) {
    console.log($event.target.value);
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

  addColor(q) {
    this.selectedColor.push(q);
    const index = this.warnanya.indexOf(q);
    if ( index !== -1) {
      this.warnanya.splice(index, 1);
    }
  }
  remColor(q) {
    const index = this.selectedColor.indexOf(q);
    if ( index !== -1) {
      this.selectedColor.splice(index, 1);
      this.warnanya.push(q);
    }
  }

  search(event) {
    const key = event.target.value;
    if (key === '') {
      this.results = [];
      this.news = '';
    }else {
      this.searchService.search(key).subscribe(data => {
        this.results = data;
        if (data.length === 0) {
          this.results = [];
          this.news = 'Product yang ada masukan adalah product baru, silahkan isi detail product';
        }
      });
    }
  }



  productSelected(hasil: any) {
    //console.log(hasil);
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
    this.countries[hasil.stock].selected = true;
    this.stok = hasil.stock;
    this.qtyOnHand = hasil.qtyOnHand;
    this.qtySeller = hasil.qtyOnSeller;
    if ( hasil.isGuarantee === undefined) {
      this.isGuarantee = 'N';
    }else {
      this.isGuarantee = hasil.isGuarantee;
    }
    if (hasil.guaranteeDays === undefined) {
      this.garansiDays = 0;
    }else {
      this.garansiDays = hasil.guaranteeDays;
    }
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

  close() {
    this.show = false;
    if (this.editMode === true) {
      this.updateData();
    }else {
      this.addProductsAsap();
    }
  }
  cancel() {
    this.show = false;
  }
  open() {
    this.show = true;
  }
  addProducts() {
    if (this.garansiDays !== 0) {
       this.isGuarantee = 'Y';
    }else {
      this.isGuarantee = 'N';
    }
    if ( this.productId === undefined) {
      swal('Nama Product harus diisi');
    }else {
      const productData = {
        pricelist: this.price,
        description: '',
        productId: this.productId,
        mBpartnerStoreId: this.storeId,
        weight: +this.weight,
        dimensionswidth: +this.lebar,
        dimensionslength: +this.panjang,
        dimensionsheight: +this.tinggi,
        specialPrice: this.specialPrice,
        isAsapShipping: 'N',
        tag: [this.productName],
        qtyOnSeller: +this.stok,
        qtyOnHand: 0,
        classification: this.classification,
        isGuarantee: this.isGuarantee,
        guaranteeDays: this.garansiDays
      };
      //console.log(productData);
      this.store.dispatch(new fromActions.AddProduct(productData));
    }
  }
  gudang($event) {
    $event.preventDefault();
    if ($event.target.value >= this.stok) {
      swal(
        'Quantity lebih kecil',
        'Dari barang yang akan dikirim ke gudang',
        'error'
      );
    }else {
      this.qtyOnHand = +$event.target.value;
    }
  }

  checkForm() {
    console.log(this.price);
    if (this.price === 0 || this.price === undefined && this.weight === 0 && this.tinggi === 0 && this.panjang === 0 && this.stok) {
      console.log('no');
    }else {
      console.log('yes');
    }
  }

  addProductsAsap() {
    this.qtySeller = this.stok - this.qtyOnHand;
    if (this.garansiDays !== 0) {
       this.isGuarantee = 'Y';
    }else {
      this.isGuarantee = 'N';
    }
    if (this.show === false) {
      if ( this.productId === undefined) {
        swal('Nama Product harus diisi');
      }else {
        const productData = {
          pricelist: this.price,
          description: '',
          productId: this.productId,
          mBpartnerStoreId: this.storeId,
          weight: +this.weight,
          dimensionswidth: +this.lebar,
          dimensionslength: +this.panjang,
          dimensionsheight: +this.tinggi,
          specialPrice: this.specialPrice,
          isAsapShipping: 'Y',
          tag: [this.productName],
          qtyOnSeller: this.qtySeller,
          qtyOnHand: +this.qtyOnHand,
          classification: this.classification,
          isGuarantee: this.isGuarantee,
          guaranteeDays: this.garansiDays
        };
        //console.log(productData);
        this.store.dispatch(new fromActions.AddProduct(productData));
      }
    }
  }

  updateProducts() {
    if ( this.productId === undefined) {
      swal('Nama Product harus diisi');
    }else {
      if (this.asap === 'Y') {
        this.open();
      }else {
        this.stok = this.stok;
        this.updateData();
      }
    }
  }

  updateData() {
    if (this.asap === 'Y') {
      this.qtySeller = this.stok - this.qtyOnHand;
      this.stok = this.qtySeller;
    }
    const productData = {
      pricelist: this.price,
      description: this.description,
      productId: this.productId,
      mBpartnerStoreId: this.storeId,
      weight: this.weight,
      dimensionswidth: this.lebar,
      dimensionslength: this.panjang,
      dimensionsheight: this.tinggi,
      specialPrice: this.specialPrice,
      isAsapShipping: this.asap ,
      tag: [this.productName],
      qtyOnSeller: this.stok,
      qtyOnHand: +this.qtyOnHand,
      classification: this.classification,
      isGuarantee: this.isGuarantee,
      guaranteeDays: this.garansiDays
    };
    //console.log(productData);
    this.store.dispatch(new fromActions.EditProduct(productData));
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

  asapPage() {
    swal({
      title: 'ASAP',
      type: 'info',
      html:
      '<div class="ui list" align="justify">' +
      '<a class="item">' +
         ' <i class="right triangle icon"></i>' +
        '<div class="content">' +
         '<div class="header">ASAP</div>' +
         '<div class="description">(As Soon As Possible) merupakan layanan ' +
         'pengiriman dari belisada yang memberikan benefit tambahan bagi customer' +
              'Gratis Biaya Pengiriman</div>' +
        '</div>' +
      '</a>' +
      '<a class="item">' +
          '<i class="right triangle icon"></i>' +
        '<div class="content">' +
          '<div class="description">Anda bisa mendapatkan layanan ASAP dari belisada  ' +
          'secara cuma-cuma sehingga anda bisa menghemat biaya pengiriman untuk pembelanjaan berikutnya' +
              '2 Hari Sampai</div>' +
        '</div>' +
      '</a>' +
      '<a class="item">' +
          '<i class="right triangle icon"></i>' +
        '<div class="content">' +
          '<div class="description">ASAP menawarkan keamanan dalam pengiriman barang ' +
          'pesanan anda. Dengan sistem packaging yang komprehensif, ASAP memberikan perlindungan' +
          'terbaik bagi barang pesanan anda dalam situasi apapun.</div>' +
        '</div>' +
      '</a>' +
      '<a class="item">' +
          '<i class="right triangle icon"></i>' +
        '<div class="content">' +
          '<div class="header">Bagaimana cara mendapatkan layanan ASAP?</div>' +
          '<div class="description">' +
              'Saat ini, layanan ASAP mengjangkau customer di wilayah Jakarta. Anda bisa' +
               'mendapatkan layanan ini dengan berbelanja di belisada dan memilih belisada ' +
               'Courrier sebagai jasa pengiriman saat check out.' +
          '</div>' +
        '</div>' +
      '</a>' ,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> OK!',
      confirmButtonAriaLabel: 'OK!',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });
  }
}
