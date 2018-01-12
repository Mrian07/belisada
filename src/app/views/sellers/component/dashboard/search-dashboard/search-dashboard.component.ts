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

  @Output() messageEvent = new EventEmitter<string>();

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Dashboard');
    this.getStoreData();
    this.storeService.getStatus().subscribe(data => {
      console.log(data[0].status);
      this.messageEvent.emit(data[0].note);
      this.sharedService.shareData = data[0].note;
      if ( data[0].statusCode === '4') {
        this.storeStatus = data[0].status;
        this.status = true;
        this.btnColor = 'green';
        this.note = data[0].note;
      } else {
        this.note = data[0].note;
        this.storeStatus = data[0].status;
        this.status = false;
        this.btnColor = 'red';
      }
      console.log(this.storeStatus);
    });
  }
  search(event) {
    const key = event.target.value;
  }

  addProducts() {
    if (this.status === false) {
      swal(
        'Toko Anda belum diverifikasi!',
        'klik OK untuk melanjutkan'
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
      console.log(response[0].mBpartnerStoreId);
      this.storeId = response[0].mBpartnerStoreId;
     // this.getStatus();
    });
  }

  getStatus() {
    // const user = this.tokenService.getUser();
    // console.log(user);
    //   if ( user.stores[0].statusCode === '4') {
    //     this.storeStatus = user.stores[0].status;
    //     this.status = true;
    //     this.btnColor = 'green';
    //   } else {
    //     this.storeStatus = user.stores[0].status;
    //     this.status = false;
    //     this.btnColor = 'red';
    //   }
  }


}
