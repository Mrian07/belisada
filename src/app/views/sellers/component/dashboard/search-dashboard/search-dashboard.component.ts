import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ActiveLink, ShareService } from '../../../../../core/service/shared.service';
import { StoreService } from '../../../../../core/service/store/store.service';
import swal from 'sweetalert2';
import { TokenService } from '../../../../../core/service/token/token.service';
import { FlagService } from '../../../../../core/service/flag.service';

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
  isClose: any;

  constructor(
    private router: Router,
    private title: Title,
    private active: ActiveLink,
    private storeService: StoreService,
    private tokenService: TokenService,
    private sharedService: ShareService,
    private flagService: FlagService
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
            this.status = false;
            this.btnColor = 'orange';
        } else {
          this.storeStatus = data[0].status;
          this.status = false;
          this.btnColor = 'red';
        }
      }
      // this.bukaToko();
    });

    this.popUp();
    this.cekStatusToko();
  }

  popUp() {
    this.flagService.currentMessage.subscribe(respon => {
      this.message = respon;
      if (this.message === 'close-popup') {
        this.closeModalShop();
        this.cekStatusToko();
      }
    });
  }

  cekStatusToko() {
    this.storeService.getAll().subscribe(response => {
      this.storeService.cekOpenClose(response[0].mBpartnerStoreId).subscribe(respon => {
        this.isClose = respon.status;
          if (respon.status === '1') {
            this.buka = true;
            this.tutup = false;
            this.toko = 'Tutup';
          } else {
            this.buka = false;
            this.tutup = true;
            this.toko = 'Buka';
          }
      });
    });
  }

  // bukaToko() {
  //   this.buka = false;
  //   this.tutup = true;
  //   this.toko = 'Buka';
  // }

  // tutupToko() {
  //   this.buka = true;
  //   this.tutup = false;
  //   this.toko = 'Tutup';
  // }

  search(event) {
    const key = event.target.value;
  }

  addProducts() {
    console.log(this.status);
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

    this.storeService.getStatus().subscribe(data => {
      if (data[0].statusCode === 'AP') {
        this.modal = true;
      } else {
        swal(
          'Opps!',
          'Toko Anda belum diverifikasi!',
          'error'
        );
      }
    });

  }

  closeModalShop() {
    this.modal = false;
  }

}
