import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StoreService } from '@belisada/core/services';
import { EtalaseStore, EtalaseStoreData } from '@belisada/core/models/store/store.model';
import { ProductService } from '@belisada/core/services/product/product.service';
import { SearchService } from '@belisada/core/services/search/search.service';
import { ListSearch } from '@belisada/core/models/search/search.model';

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
activeSpesifikasi: boolean;
activeDiskripsi: boolean;
activeDiskusi: boolean;
activeUlasan: boolean;
productImageUrl: any;


  constructor(private route: ActivatedRoute, private storeS: StoreService, private prodS: SearchService) {

    // this.storeImage = 'http://image.belisada.id:8888/unsafe/180x180/center/';
    this.storeImage = 'http://image.belisada.id:8888/unsafe/180x180/center/filters:fill(fff)/';
    this.productStoreUrl = 'http://image.belisada.id:8888/unsafe/30x30/center/';
    this.productImageUrl = 'http://image.belisada.id:8888/unsafe/180x180/center/filters:fill(fff)/';
  }

  ngOnInit() {
    this.activeSpesifikasi = true;
    this.route.params.subscribe( params =>
      this.aaaa = params.urls
    );
    this.storeS.getEtalase(this.aaaa).subscribe(response => {
      this.proddetail = response.data;

      const queryParams = {
        store: this.proddetail.storeId
      };
      console.log(queryParams);
    this.prodS.getList(queryParams).subscribe(responseList => {
      this.list  = responseList;
    });
      });
  }
  active() {
    this.activeSpesifikasi = false;
    this.activeDiskripsi = false;
    this.activeDiskusi = false;
    this.activeUlasan = false;
  }
  spesifikasi() {
    this.active();
    this.activeSpesifikasi = true;
  }

}
