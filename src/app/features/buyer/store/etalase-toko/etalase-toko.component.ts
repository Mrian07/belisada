import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StoreService } from '@belisada/core/services';
import { EtalaseStore, EtalaseStoreData } from '@belisada/core/models/store/store.model';
import { ProductService } from '@belisada/core/services/product/product.service';
import { SearchService } from '@belisada/core/services/search/search.service';
import { ListSearch } from '@belisada/core/models/search/search.model';
import { environment } from '@env/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-etalase-toko',
  templateUrl: './etalase-toko.component.html',
  styleUrls: ['./etalase-toko.component.scss']
})
export class EtalaseTokoComponent implements OnInit {
  aaaa: any;
  proddetail:  EtalaseStoreData = new EtalaseStoreData();
  storeImage: any;
  productStoreUrl: any;
  list: ListSearch = new ListSearch();
  activeProduct: boolean;
  activeDiskripsi: boolean;
  activeDiskusi: boolean;
  activeUlasan: boolean;
  productImageUrl: any;

  currentPage: number;

  pages: any = [];
  lastPage: number;


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private storeS: StoreService,
    private prodS: SearchService,
    private router: Router) {

    this.storeImage = environment.thumborUrl + 'unsafe/fit-in/180x180/center/filters:fill(fff)/';
    this.productImageUrl = environment.thumborUrl + 'unsafe/fit-in/400x400/center/filters:fill(fff)/';
    this.productStoreUrl = environment.thumborUrl + 'unsafe/50x50/center/filters:fill(fff)/';
  }

  ngOnInit() {
    this.activeProduct = true;
    this.route.params.subscribe( params =>
      this.aaaa = params.urls
    );
    this.storeS.getEtalase(this.aaaa).subscribe(response => {
      this.proddetail = response.data;

      this.getProductList(this.proddetail.storeId);
    });
  }

  getProductList(storeId) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];

      const queryParams = {
        store: storeId,
        itemperpage: 16,
        page: this.currentPage
      };
      this.storeS.getStoreProductList(queryParams).subscribe(responseList =>{
        console.log(responseList);
        this.list  = responseList;
        this.pages = [];
        this.lastPage = this.list.totalPages;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.list.totalPages) {
            this.pages.push(r);
          }
        }

      })
      // this.prodS.getList(queryParams).subscribe(responseList => {
      //   this.list  = responseList;
      //   this.pages = [];
      //   this.lastPage = this.list.totalPages;
      //   for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
      //     if (r > 0 && r <= this.list.totalPages) {
      //       this.pages.push(r);
      //     }
      //   }
      // });
    });
  }

  active() {
    this.activeProduct = false;
    this.activeDiskripsi = false;
    this.activeDiskusi = false;
    this.activeUlasan = false;
  }

  spesifikasi() {
    this.active();
    this.activeProduct = true;
  }

  public encodeUrl(name) {
    return name.replace(new RegExp('/', 'g'), ' ');
  }

  goToDetail(id, name) {
    const r = name.replace(new RegExp('/', 'g'), ' ');
    this.router.navigate(['/product/product-detail/' + id + '/' + r]);
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.list.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/' + this.aaaa], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
}
