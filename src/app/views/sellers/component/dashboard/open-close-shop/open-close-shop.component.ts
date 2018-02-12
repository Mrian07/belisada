import { StoreService } from './../../../../../core/service/store/store.service';
import { Component, OnInit } from '@angular/core';
import { FlagService } from '../../../../../core/service/flag.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-open-close-shop',
  templateUrl: './open-close-shop.component.html',
  styleUrls: ['./open-close-shop.component.scss']
})
export class OpenCloseShopComponent implements OnInit {
  createComForm: FormGroup;
  dateStart: FormControl;
  dateEnd: FormControl;
  isOffDay: FormControl;
  mBpartnerStoreId: FormControl;
  modal: boolean;
  constructor(
    private storeService: StoreService,
    private flagService: FlagService
  ) { }

  ngOnInit() {

  }

  createFormControls() {
    this.dateStart = new FormControl('');
    this.dateEnd = new FormControl('');
    this.isOffDay = new FormControl('');
    this.mBpartnerStoreId = new FormControl('');
  }

  createForm() {
    this.createComForm = new FormGroup({
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      isOffDay: this.isOffDay,
      mBpartnerStoreId: this.mBpartnerStoreId,
    });
  }

  closeModalShop() {
    console.log('testing');
    this.flagService.changeMessage('close-popup');
  }

  onSubmit() {
    const model = this.createComForm.value;
    const data = {
      dateStart: model.dateStart,
      dateEnd: model.dateEnd,
      isOffDay: model.isOffDay,
      mBpartnerStoreId: model.mBpartnerStoreId
    };

    this.storeService.openClose(data).subscribe(response => {

      // if (response.status === '1') {
      //   swal(
      //     'Sukses',
      //     'Data berhasil ditambahkan',
      //     'success'
      //   );
      // }else {
      //   swal(
      //     'Opps!',
      //     response.message,
      //     'error'
      //   );
      // }
      // this.fillForms();
    });

  }
}
