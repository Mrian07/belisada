import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ActiveLink, ShareService } from '../../../../../core/service/shared.service';
import { StoreService } from '../../../../../core/service/store/store.service';
import swal from 'sweetalert2';
import { TokenService } from '../../../../../core/service/token/token.service';


@Component({
  selector: 'app-search-dashboard',
  templateUrl: './search-dashboard.component.html',
  styleUrls: ['./search-dashboard.component.scss']
})
export class SearchDashboardComponent implements OnInit {

  storeId: number;
  status: any;
  storeStatus: string;
  btnColor: string;
  note: string;
  message: string;
  buka: Boolean;
  tutup: Boolean;
  toko: string;
  storeName: string;

  modal: boolean;

  constructor(
    private router: Router,
    private title: Title,
    private active: ActiveLink,
    private storeService: StoreService,
    private tokenService: TokenService,
    private sharedService: ShareService
  ) { }

  // 'DR','SEDANG DI REVIEW',1
  // 'PE','MOHON DIPERBAIKI',2
  // 'RV','REVIEW',5
  // 'RJ','REJECTED',3
  // 'AP','SUDAH TAYANG',4

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Dashboard');
    this.getStoreData();
    this.storeService.getStatus().subscribe(data => {
      console.log('data[0].statusCode: ', data[0].statusCode);
      if (data.length !== 0) {
        this.storeName = data[0].name;
        if (this.sharedService.shareData) {
          this.sharedService.shareData = data[0].note;
        }
        if ( data[0].statusCode === 'AP') {
          this.storeStatus = data[0].status;
          this.status = true;
          this.btnColor = 'green';
        }else if ( data[0].statusCode === 'DR') {
            this.storeStatus = 'Toko anda akan di approve dalam 24 jam';
            this.status = true;
            this.btnColor = 'orange';
        } else {
          this.storeStatus = data[0].status;
          this.status = false;
          this.btnColor = 'red';
        }
      }
      this.bukaToko();
    });
  }

  bukaToko() {
    this.buka = false;
    this.tutup = true;
    this.toko = 'Buka';
  }

  tutupToko() {
    this.buka = true;
    this.tutup = false;
    this.toko = 'Tutup';
  }

  search(event) {
    const key = event.target.value;
  }

  addProducts() {
    if (this.status === false) {
      swal(
        'Belisada.co.id',
        'Toko Anda belum diverifikasi!'
      ).then((result) => {
        // this.router.navigateByUrl('/sign-up');
      });
    }else {
      this.storeService.getAll().subscribe(response => {
        if (response.length === 0) {
          swal(
            'Anda belum membuat Toko!',
            'klik OK untuk melanjutkan'
          ).then((result) => {
            this.router.navigateByUrl('seller/toko');
          });
        }else {
          this.router.navigate(['seller/add-products/add']);
        }
      });
    }
  }

  getStoreData() {
    this.storeService.getAll().subscribe(response => {
      if (response.length !== 0) {
        this.storeId = response[0].mBpartnerStoreId;
      }
    });
  }

  openModalShop() {
    this.modal = true;
  }

  closeModalShop() {
    this.modal = false;
  }

}
