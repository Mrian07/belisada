import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../../../../core/service/store/store.service';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { CourierService } from '../../../../../core/service/courier/courier.service';
import { Courier } from '../../../../../core/model/courier';

export class Option {
  name: any;
  value: number;
  checked: Boolean;
}

@Component({
  selector: 'app-m-courier',
  templateUrl: './m-courier.component.html',
  styleUrls: ['./m-courier.component.scss']
})
export class MCourierComponent implements OnInit {

  updateImg: Boolean = false;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  sellerimage: string;
  storeName: string;
  storeDesc: string;
  status1: Boolean = true;
  status2: Boolean = false;
  status3: Boolean = false;
  status4: Boolean = false;
  status: any;
  lang: any;

  user: any;
  stores: any = [];

  pathArray: any;
  activeLink: any;
  eCheckDisabled: any;
  eCheckReadonly: any;

  message: string;
  courierList: Courier[];
  options: Array<Option> = new Array<Option>();

  fm: any = {};
  userImgAvatar: string;

  constructor(private router: Router,
  private storeService: StoreService,
  private translate: TranslateService,
  private courierService: CourierService
) {  }


  ngOnInit() {
    this.getUri();
    this.lang = localStorage.getItem('language');
    if (this.lang) {
      this.translate.use(this.lang);
    }

    this.storeService.getAll().subscribe(response => {
      console.log('response: ', response);
      this.stores = response;
      this.courier();
    });
  }

  courier() {
    if (this.stores.length !== 0) {
      this.courierService.getByStoreId(this.stores[0].mBpartnerStoreId).subscribe(response => {
        console.log('response: ', response);
        response.forEach(courier => {
          this.options.push({
            name: courier.name,
            value: courier.shipperId,
            checked: courier.used === 'Y' ? true : false
          });
        });
      });
    }
  }

  get selectedOptions() { // right now: ['1','3']
    const couriers = [];
    const checkboxes = (<HTMLInputElement[]><any>document.getElementsByName('couriers'));

    checkboxes.forEach(x => {
      couriers.push({
        shipperId: +x.value,
        used: x.checked === true ? 'Y' : 'N'
      });
    });

    return couriers;
  }

  onSubmit() {
    const data = {
      mBpartnerStoreId: this.stores[0].mBpartnerStoreId,
      shipper: this.selectedOptions
    };

    this.courierService.save(data).subscribe(x => {
      if (x.status === '1') {

      }
      swal(x.message);
    });
  }

  getUri() {
    this.pathArray = window.location.pathname.split( '/' );
    this.activeLink = this.pathArray[2];
  }


}
