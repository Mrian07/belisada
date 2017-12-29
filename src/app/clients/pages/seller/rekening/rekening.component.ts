import { RekeningSService } from './../../../../servers/service/rekening/rekening-s.service';
import { FormsModule } from '@angular/forms';
import { Rekening } from './../../../../servers/model/rekening';
import { SearchService } from './../../../../servers/service/search/search.service';
import { Component, OnInit,  ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { ProfileService } from '../../../../servers/service/profile/profile.service';
import { NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MasterService } from '../../../../servers/service/master/master.service';

@Component({
  selector: 'app-rekening',
  templateUrl: './rekening.component.html',
  styleUrls: ['./rekening.component.scss']
})
export class RekeningComponent implements OnInit {
  @ViewChild('f') form: any;

  constructor(private masterService: MasterService, private searchService: SearchService, private rekeningService: RekeningSService) { }
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

  ngOnInit() {
    this.selectCity(this.mBankId);
    this.getAllStore1();
  }
  selectCity(mBankId: number) {
    this.masterService.getBankList().subscribe(data => {
      this.searchrek = data;
     // console.log('ini nih token', this.token1.token);
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
    console.log('ini nih', id.accountName);
    console.log('ini nih2', id.accountNo);
    console.log('ini semuanya', id);
  }
  hapusUd(id) {
    console.log(id);
    const user = JSON.parse(localStorage.user);
    this.rekeningService.delete(id, {'token': user.token}).subscribe(data => {
      this.postrek1 = data;
      this.getAllStore1();
      console.log('ini', this.postrek2);
    });
  }
}
