import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../servers/service/profile/profile.service';

@Component({
  selector: 'app-rekening',
  templateUrl: './rekening.component.html',
  styleUrls: ['./rekening.component.scss']
})
export class RekeningComponent implements OnInit {

  constructor(private bank: ProfileService) { }

  bankList = [];
  selectedBanks: string;
  toggle: Boolean = false;

  ngOnInit() {
  }

  getBank() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.bank.getBank(user.token).subscribe(data => {
      console.log(data);
      this.bankList = data;
    });
  }

  toggleBanks() {
    this.toggle = true;
  }
  bankSelected(hasil) {
    console.log(hasil);
  }

}
