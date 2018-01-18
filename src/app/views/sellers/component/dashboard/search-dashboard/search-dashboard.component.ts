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

  constructor(
    private router: Router,
    private title: Title,
    private active: ActiveLink,
    private storeService: StoreService,
    private tokenService: TokenService,
    private sharedService: ShareService
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Dashboard');
    this.getStoreData();
    this.storeService.getStatus().subscribe(data => {
      if (data) {
        if (this.sharedService.shareData) {
          this.sharedService.shareData = data[0].note;
        }
        if ( data[0].statusCode === '4') {
          this.storeStatus = data[0].status;
          this.status = true;
          this.btnColor = 'green';
        } else {
          this.storeStatus = data[0].status;
          this.status = false;
          this.btnColor = 'red';
        }
      }
    });
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
       // this.router.navigateByUrl('seller/toko');
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
      if (response) {
        this.storeId = response[0].mBpartnerStoreId;
      }
    });
  }



}
