import { FormsModule } from '@angular/forms';
import { Rekening } from './../../../../servers/model/rekening';
import { SearchService } from './../../../../servers/service/search/search.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../servers/service/profile/profile.service';

@Component({
  selector: 'app-rekening',
  templateUrl: './rekening.component.html',
  styleUrls: ['./rekening.component.scss']
})
export class RekeningComponent implements OnInit {

  constructor(private searchService: SearchService) { }
  searchrek = [];
  postrek1: Rekening[];
  public user: Object;
  mBankId: number;
  accountName: string;
  accountNo : string;

  token1 = this.user = JSON.parse(localStorage.user);
  token2 = this.token1.token;

  ngOnInit() {
    this.selectCity();

  }
  selectCity() {
    this.searchService.searchRek().subscribe(data => {
      this.searchrek = data;
      console.log('ini nih token',this.token1.token);
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
