import { Token } from './../../../../core/model/login';
import { Store, ActionsSubject } from '@ngrx/store';
import { Component, OnInit, NgZone } from '@angular/core';
import { NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn, FormsModule } from '@angular/forms';
import { Directive, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import { Rekening } from '../../../../core/model/rekening';
import { Bank } from '../../../../core/model/bank';
import { MasterService } from '../../../../core/service/master/master.service';
import { SearchService } from '../../../../core/service/search/search.service';
import { RekeningSService } from '../../../../core/service/rekening/rekening-s.service';
import * as fromActions from '../../../../store/actions';
import * as fromProduct from '../../../../store/reducers';
import { Subscription } from 'rxjs/Subscription';
import { transition } from '@angular/core/src/animation/dsl';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-rekening',
  templateUrl: './rekening.component.html',
  styleUrls: ['./rekening.component.scss']
})
export class RekeningComponent implements OnInit {
@ViewChild('div') div: ElementRef;

  constructor(
    private masterService: MasterService,
    private searchService: SearchService,
    private rekeningService: RekeningSService,
    private store: Store<fromProduct.Banks>,
    private actionsSubject: ActionsSubject,
    private ngZone: NgZone,
    private title: Title
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
  role: any;
  accountName: string;
  accountNo: string;
  show: boolean = false;
  show1: boolean = true;
  tst = false;
  mBankAccountId: number;
  id: number;
  rekening: Observable<any>;
  bank: Observable<any>;
  token: any;
  deletebank: Subscription;
  editbank: Subscription;

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Rekening Bank');
    const user = JSON.parse(localStorage.user);
    this.token = user.token;
    this.selectCity();
    this.role = user.role;
    this.store.dispatch(new fromActions.GetBank(user.token));
    this.getRole();
    this.deletebank = this.actionsSubject
        .asObservable()
        .filter(action => action.type === fromActions.DELETEBANKSUCCESS)
        .subscribe((action: fromActions.DeleteBankSuccess) => {
          this.ngZone.run(() => { this.rekening = Observable.of(action.success);
            //console.log('delete Done!');
          });
           swal(
                'Produk berhasil di hapus!',
                'success'
              ).then((result) => {
              });
        });

    this.editbank = this.actionsSubject
        .asObservable()
        .filter(action => action.type === fromActions.EDITBANKSUCCESS)
        .subscribe((action: fromActions.EditBankSuccess) => {
          this.ngZone.run(() => { this.rekening = Observable.of(action.success);
          });
           swal(
                'Rekening berhasil di Perbarui!',
                'success'
              ).then((result) => {
              });
        });

   this.rekening = this.store.select<any>(fromProduct.getBankState);
  //  console.log(this.rekening);
  }
  selectCity() {
    this.masterService.getBankList().subscribe(data => {
      this.searchrek = data;
      // console.log('askdksaldksad', data);
    });

  }
  getRole() {

    // this.div.nativeElement.innerHTML ='';

    if (this.role === 6) {
    }else {
    }


  }
  getBankList() {
    this.rekening = this.store.select<any>(fromProduct.getBankState);
  }

  saveRek() {

    const a = {
      accountNo : this.accountNo,
      accountName : this.accountName,
      mBankId : this.selectedCategory.mbankId
    };
    this.store.dispatch(new fromActions.AddBank({data: a, token: this.token}));
    this.clearForm();
  }

  editRek() {

    if (this.selectedCategory.mbankId === undefined) {
      swal('Nama Bank Harus dipilih');
    } else {
      const b = {
        accountNo : this.accountNo,
        accountName : this.accountName,
        mBankId : this.selectedCategory.mbankId,
        mBankAccountId: this.mBankAccountId
      };
      this.store.dispatch(new fromActions.EditBank({data: b, token: this.token}));
    }
  }
  getAllStorex(id) {
    this.accountName = id.accountName;
    this.accountNo = id.accountNo;
    this.mBankAccountId = id.mBankAccountId;
    this.show1 = false;
    this.show = true;
    // this.show = true;
    this.selectedCategory = this.searchrek.find(x => x.mbankId === id.mBankId);
  }

  hapusUd(id) {
    swal({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      this.store.dispatch(new fromActions.DeleteBankList(id));
      });
  }
  cancelBtn() {
    this.show = false;
    this.show1 = true;
    this.clearForm();
  }

  clearForm() {
    this.accountNo = '';
    this.accountName = '';
    this.mBankId = null;
    this.mBankAccountId = null;
  }
}
