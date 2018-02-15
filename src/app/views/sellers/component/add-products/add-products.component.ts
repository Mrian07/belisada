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
import { BrandsService } from '../../../../core/service/brands/brands.service';

interface AppState {
  message: any;
}

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})

export class AddProductsComponent implements OnInit {
  disabled: any;
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
  news2: any;
  selectedColor = [];
  fm: any = {};
  ctr: any = {};
  updateImg: any;
  userImage: string;
  imgNpwp: any;
  qid: any;
  optionTemplate: any;
  highlight: any;
  category3: any;
  productBrandId: number;
  gambarnya: any;
  cat3Id: number;
  partNumber: string;
  pid: any;
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
    {id: 11, name: '11' , selected: false},
    {id: 12, name: '12' , selected: false},
    {id: 13, name: '13' , selected: false},
    {id: 14, name: '14' , selected: false},
    {id: 15, name: '15' , selected: false},
    {id: 16, name: '16' , selected: false},
    {id: 17, name: '17' , selected: false},
    {id: 18, name: '18' , selected: false},
    {id: 19, name: '19' , selected: false},
    {id: 20, name: '20' , selected: false},
    {id: 21, name: '21' , selected: false},
    {id: 22, name: '22' , selected: false},
    {id: 23, name: '23' , selected: false},
    {id: 24, name: '24' , selected: false},
    {id: 25, name: '25' , selected: false},
    {id: 26, name: '26' , selected: false},
    {id: 27, name: '27' , selected: false},
    {id: 28, name: '28' , selected: false},
    {id: 29, name: '29' , selected: false},
    {id: 30, name: '30' , selected: false},
  ];
    constructor(private searchService: SearchService, private categoryService: CategoryService,
      private route: ActivatedRoute, private router: Router, private storeService: StoreService,
      private addService: AddproductService,
      private actionsSubject: ActionsSubject,
      private brand: BrandsService,
      private store: Store<fromProduct.Products>,
      private title: Title,
      private shared: ShareService,
      private ngzone: NgZone
    ) {
      this.route.params.subscribe( id => {
        this.editid = id;
      });
      this.quantity = this.countries;
    }


  ngOnInit() {
    this.disabled = '';
    this.title.setTitle('Belisada Seller - Add Product');
    this.news2 = 'Pilih hanya Brand/Merk yang sudah ada di daftar';
    this.courier = 0;
    this.news = '';
    this.results = [];
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
              this.router.navigateByUrl('/seller/product-list');
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
    if (id === 1001178) {
      this.disabled = true;
    }else {
      this.categoryService.CategoryTwo(id).subscribe(data => {
        this.disabled = '';
        this.subcategory = data;
      });
    }
  }

  selectSubCategory(id: number) {
    this.categoryService.CategoryThree(id).subscribe(data => {
      this.subcategories = data;
    });
  }

  selectSubCategories(id: number) {
    this.cat3Id = id;
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
      this.clearAll();
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
    this.categoryService.CategoryTwo(hasil.category1Id).subscribe(cat2 => {
      this.subcategory = cat2;
      this.categoryService.CategoryThree(hasil.category2Id).subscribe(cat3 => {
        this.subcategories = cat3;
      });
    });
    this.news = '';
    this.pid = hasil.productId;
    this.productName = hasil.name;
    this.selectedCategory = hasil.category1Name;
    this.ctr.cat1 = hasil.category1Id;
    this.ctr.cat1name = hasil.category1Name;
    this.ctr.cat2 = hasil.category2Id;
    this.ctr.cat2name = hasil.category2Name;
    this.ctr.cat3 = hasil.category3Id;
    this.ctr.cat3name = hasil.category3Name;
    this.ctr.brand = hasil.productbrandId;
    this.ctr.brandname = hasil.brandname;
    this.selectedSubCategory = hasil.category2Name;
    this.selectedSubCategories = hasil.category3Name;
    this.selectedBrands = hasil.brandname;
    this.productBrandId = hasil.productbrandId;
    this.results = [];
    this.selectCats = hasil.name;
    this.price = hasil.pricelist;
    this.specialPrice = hasil.specialPrice;
    this.description = hasil.description;
    this.highlight = hasil.highlight;
    this.imageurl = hasil.imageurl;
    this.weight = hasil.weight;
    this.toggle = false;
    this.productId = hasil.qid;
    this.qid = hasil.qid;
    this.lebar = hasil.dimensionswidth;
    this.tinggi = hasil.dimensionsheight;
    this.panjang = hasil.dimensionslength;
    this.asap = hasil.isAsapShipping;
    this.stok = hasil.stock;
    this.countries[hasil.stock].selected = true;
    this.qtyOnHand = hasil.qtyOnHand;
    this.qtySeller = hasil.qtyOnSeller;
    this.partNumber = hasil.partNumber;
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
    console.log(hasil);
  }
  getBrands() {
    this.categoryService.BrandCategory().subscribe(data => {
      this.brands = data;
      this.toggle = false;
    });
  }
  selectBrands(id: number) {
    this.productBrandId = id;
  }
  checkBrand(id: number) {
    // console.log('check', id);
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
    if (this.price === undefined && this.productName === undefined &&
      this.weight === undefined && this.panjang === undefined && this.lebar === undefined
       && this.tinggi === undefined) {
        swal(
          'Belisada.co.id',
          'Semua Field harus di isi'
        );
       }else {
        this.show = true;
       }
  }
  subs() {
        if (this.qtyOnHand > 0 && this.stok === 0) {
          this.addProductsAsap();
        }else if (this.qtyOnHand > 0 && this.stok > 0) {
          this.addProductsAsap();
          this.addProducts();
        }else  if (this.qtyOnHand === 0 && this.stok > 0) {
          this.addProducts();
        }
  }
  addProducts() {
    this.userImage = this.fm.imageNPWP;
    if (this.price === undefined && this.productName === undefined &&
     this.weight === undefined && this.panjang === undefined && this.lebar === undefined
      && this.tinggi === undefined && this.stok === 0) {
        swal(
          'Belisada.co.id',
          'Semua Field harus di isi'
        );
    }else {
      if ( this.userImage === undefined && this.imageurl !== undefined) {
        this.gambarnya = [];
      }else if ( this.userImage !== undefined && this.imageurl === undefined) {
        this.gambarnya = [this.userImage];
      }else if ( this.userImage === undefined && this.imageurl === undefined) {
        swal(
          'Belisada.co.id',
          'Gambar harus ada'
        );
      }
      if (this.cat3Id === undefined) {
        this.cat3Id = this.ctr.cat3;
      }
      if (this.productName === undefined) {
        this.productName = this.selectCats;
      }
      if (this.garansiDays !== 0) {
        this.isGuarantee = 'Y';
      }else {
        this.isGuarantee = 'N';
      }

      if (this.productId === undefined) {
        this.productId = null;
      }else {}
      const productData = {
        productId: this.productId,
        name: this.productName,
        highlight: this.highlight,
        description: this.description,
        classification: this.classification,
        image: this.gambarnya,
        pricelist: this.price,
        specialPrice: this.specialPrice,
        mBpartnerStoreId: this.storeId,
        category3Id: this.cat3Id,
        productbrandId: this.productBrandId,
        tag: [this.productName],
        weight: +this.weight,
        dimensionswidth: +this.lebar,
        dimensionslength: +this.panjang,
        dimensionsheight: +this.tinggi,
        isAsapShipping: 'N',
        qtyOnHand: 0,
        partNumber: this.partNumber,
        qtyOnSeller: +this.stok,
        isGuarantee: this.isGuarantee,
        guaranteeDays: +this.garansiDays
      };
      this.store.dispatch(new fromActions.AddProduct(productData));
      swal({
        title: 'Belisada.co.id',
        text: 'Uploading',
        timer: 3000,
        onOpen: () => {
          swal.showLoading();
        }
      });
    }
  }
  gudang($event) {
    $event.preventDefault();
      this.qtyOnHand = +$event.target.value;
  //  }
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
    // if (this.price === undefined && this.productName === undefined &&
    //   this.weight === undefined && this.panjang === undefined && this.lebar === undefined
    //    && this.tinggi === undefined) {
    //      swal(
    //        'Belisada.co.id',
    //        'Semua Field harus di isi'
    //      );
    //  }else {
        this.qtySeller = this.stok - this.qtyOnHand;
        if (this.garansiDays !== 0) {
          this.isGuarantee = 'Y';
        }else {
          this.isGuarantee = 'N';
        }
        // if (this.show === false) {
          const productData = {
            pricelist: this.price,
            description: '',
            productId: this.qid,
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
          console.log('asap', productData);
         // this.store.dispatch(new fromActions.AddProduct(productData));
         // this.clearAll();
       // }
}

  updateProducts() {
    // if ( this.productId === undefined) {
    //   swal('Nama Product harus diisi');
    // }else {
    //   if (this.asap === 'Y') {
    //     this.open();
    //   }else {
        this.stok = this.stok;
        this.updateData();
    //   }
    // }
  }

  updateData() {
    if (this.asap === 'Y') {
      this.qtySeller = this.stok - this.qtyOnHand;
      this.stok = this.qtySeller;
    }
    const productData = {
      pricelist: this.price,
      description: this.description,
      productId: this.pid,
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
    console.log(productData);
    this.store.dispatch(new fromActions.EditProduct(productData));
  }

  clearAll() {
    this.selectedCategory = '';
    this.selectedSubCategory = '';
    this.selectedSubCategories = '';
    this.selectedBrands = '';
    this.results = [];
    this.selectCats = '';
    this.price = undefined ;
    this.description = '';
    this.imageurl = undefined;
    this.weight = undefined;
    this.panjang = undefined;
    this.lebar = undefined;
    this.tinggi = undefined;
    this.toggle = false;
    this.productId = undefined;
    this.selectedBrands = '';
    this.productName = undefined;
  }

  asapPage() {
    swal({
      title: 'ASAP',
      type: 'info',
      html:
      '<div class=ui list align=justify>' +
      '<a class=item>' +
         ' <i class=right triangle icon></i>' +
        '<div class=content>' +
         '<div class=header>ASAP</div>' +
         '<div class=description>(As Soon As Possible) merupakan layanan ' +
         'pengiriman dari belisada yang memberikan benefit tambahan bagi customer' +
              'Gratis Biaya Pengiriman</div>' +
        '</div>' +
      '</a>' +
      '<a class=item>' +
          '<i class=right triangle icon></i>' +
        '<div class=content>' +
          '<div class=description>Anda bisa mendapatkan layanan ASAP dari belisada  ' +
          'secara cuma-cuma sehingga anda bisa menghemat biaya pengiriman untuk pembelanjaan berikutnya' +
              '2 Hari Sampai</div>' +
        '</div>' +
      '</a>' +
      '<a class=item>' +
          '<i class=right triangle icon></i>' +
        '<div class=content>' +
          '<div class=description>ASAP menawarkan keamanan dalam pengiriman barang ' +
          'pesanan anda. Dengan sistem packaging yang komprehensif, ASAP memberikan perlindungan' +
          'terbaik bagi barang pesanan anda dalam situasi apapun.</div>' +
        '</div>' +
      '</a>' +
      '<a class=item>' +
          '<i class=right triangle icon></i>' +
        '<div class=content>' +
          '<div class=header>Bagaimana cara mendapatkan layanan ASAP?</div>' +
          '<div class=description>' +
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
        '<i class=fa fa-thumbs-up></i> OK!',
      confirmButtonAriaLabel: 'OK!',
      cancelButtonText:
      '<i class=fa fa-thumbs-down></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });
  }
  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;

    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }
  setCanvas(e, newIMG) {
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.target;
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.fm[newIMG] = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');
  }
}
