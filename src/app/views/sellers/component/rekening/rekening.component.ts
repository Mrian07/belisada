import { Store } from '@ngrx/store';
import { Component, OnInit,  ViewChild } from '@angular/core';
import { NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn, FormsModule } from '@angular/forms';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import { Rekening } from '../../../../core/model/rekening';
import { Bank } from '../../../../core/model/bank';
import { MasterService } from '../../../../core/service/master/master.service';
import { SearchService } from '../../../../core/service/search/search.service';
import { RekeningSService } from '../../../../core/service/rekening/rekening-s.service';
import * as fromActions from '../../../../store/actions';
import * as fromProduct from '../../../../store/reducers';


@Component({
  selector: 'app-rekening',
  templateUrl: './rekening.component.html',
  styleUrls: ['./rekening.component.scss']
})
export class RekeningComponent implements OnInit {
  @ViewChild('f') form: any;

  constructor(
    private masterService: MasterService,
    private searchService: SearchService,
    private rekeningService: RekeningSService,
    private store: Store<fromProduct.Banks>
  ) {  }
  public user: Object;
  searchrek: any;
  postrek1: Rekening;
  postrek2: Rekening[];
  loading: any;
  mBankId: number;
  message: string;
  status: string;
  selectedCategory: any;
  accountName: string;
  accountNo: string;
  mBankAccountId: number;
  id: number;
  rekening: Observable<any>;
  bank: Observable<any>;

  ngOnInit() {
    const user = JSON.parse(localStorage.user);
    this.store.dispatch(new fromActions.GetBank(user.token));
    this.selectCity(this.mBankId);
   // this.getAllStore1();
    this.rekening = this.store.select(fromProduct.getBankState);

  }
  selectCity(mBankId: number) {
    this.masterService.getBankList().subscribe(data => {
      this.searchrek = data;
      this.store.dispatch({type: 'GETBANK', bank: data});
    });
  }
  getAllStore1() {
    const user = JSON.parse(localStorage.user);
    this.rekeningService.getAll({'token': user.token}).subscribe(data => {
      this.postrek2 = data;
    });
  }

  getAllStore() {
    console.log('this.selectedCategory: ', this.selectedCategory.mbankId);
    const a = {
      accountNo : this.accountNo,
      accountName : this.accountName,
      mBankId : this.selectedCategory.mbankId
    };
    const user = JSON.parse(localStorage.user);
    this.rekeningService.create(a, {'token': user.token}).subscribe(data => {
      this.getAllStore1();
      this.postrek1 = data;
      this.form.reset();
      if (data.message === 'gagal Tambah') {
        swal(
          'Oops',
          data.message,
          'error'
        );
      }else {
        swal(
          'success!',
          data.message,
          'success',

        );

      }



    });
  }
  getAllStore7() {
    console.log('this.selectedCategory: ', this.selectedCategory.mbankId);
    const b = {
      accountNo : this.accountNo,
      accountName : this.accountName,
      mBankId : this.selectedCategory.mbankId,
      mBankAccountId: this.mBankAccountId
    };
    const user = JSON.parse(localStorage.user);
    this.rekeningService.update(b, {'token': user.token}).subscribe(data => {
      return false;
    });
  }
  getAllStorex(id) {
    this.accountName = id.accountName;
    this.accountNo = id.accountNo;
    this.selectedCategory = id.mBankId;
    this.mBankAccountId = id.mBankAccountId;
  }
  hapusUd(id) {
    console.log(id);
    const user = JSON.parse(localStorage.user);
    this.rekeningService.delete(id, {'token': user.token}).subscribe(data => {
      this.postrek1 = data;
      this.getAllStore1();
     // console.log('ini', this.postrek2);
    });
  }
}
