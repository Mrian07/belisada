import { RekeningSService } from './../../../../servers/service/rekening/rekening-s.service';
import { FormsModule } from '@angular/forms';
import { Rekening } from './../../../../servers/model/rekening';
import { SearchService } from './../../../../servers/service/search/search.service';
import { Component, OnInit,  ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { ProfileService } from '../../../../servers/service/profile/profile.service';
import { NG_VALIDATORS,Validator,
  Validators,AbstractControl,ValidatorFn } from '@angular/forms';
  import { Directive, ElementRef, HostListener, Input } from '@angular/core';
  
@Component({
  selector: 'app-rekening',
  templateUrl: './rekening.component.html',
  styleUrls: ['./rekening.component.scss']
})
export class RekeningComponent implements OnInit {
  @ViewChild('f') form: any;

  @Input() OnlyNumber: boolean;
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    if (this.OnlyNumber) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
      }
  }

  constructor(private searchService: SearchService, private rekeningService: RekeningSService,private el: ElementRef) { }
  searchrek : any;
   pattern=/06([0-9]{8})/;
  postrek1: Rekening;
  postrek2: Rekening[];
  public user: Object;
  mBankId: number;
  message :string;
  status: string;
  selectedCategory;
  accountName: string;
  accountNo : string;
  mBankAccountId;
  id;
  token1 = this.user = JSON.parse(localStorage.user);
  token2 = this.token1.token;

  ngOnInit() {
    this.selectCity(this.mBankId);
    this.getAllStore1();
   
  }
  selectCity(mBankId: number) {
    this.searchService.searchRek(this.selectCity).subscribe(data => {
      this.searchrek = data;
      console.log('ini nih token',this.token1.token);
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
  hapusUd(id){
    console.log(id);
    const user = JSON.parse(localStorage.user);
    this.rekeningService.delete(id, {'token': user.token}).subscribe(data => {
      this.postrek1 = data;
      this.getAllStore1();
      console.log('ini',this.postrek2);
    });
  }

  getalat() {
    const registernih = {
      accountNo : this.accountNo,
      accountName : this.accountName,
      mBankId : this.mBankId
    };
    this.searchService.postRek(this.token2).subscribe(data => {
      console.log('sukes cuy');
  });
  }
 
  

}
