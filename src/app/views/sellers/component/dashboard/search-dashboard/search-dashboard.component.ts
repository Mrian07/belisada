import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ActiveLink } from '../../../../../core/service/shared.service';
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

  constructor(
    private router: Router,
    private title: Title,
    private active: ActiveLink,
    private storeService: StoreService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Dashboard');
    this.getStoreData();
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
      this.getStatus();
    });
  }

  getStatus() {
    const user = this.tokenService.getUser();
      if ( user.stores[0].statusCode === '4') {
        this.storeStatus = user.stores[0].status;
        this.status = true;
        this.btnColor = 'green';
      } else {
        this.storeStatus = user.stores[0].status;
        this.status = true;
        this.btnColor = 'red';
      }
  }

}
