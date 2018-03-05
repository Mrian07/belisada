import { Router } from '@angular/router';
import { TokenService } from '../../../../../core/service/token/token.service';
import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../../../core/service/shared.service';


@Component({
  selector: 'app-m-sign-up-success',
  templateUrl: './m-sign-up-success.component.html',
  styleUrls: ['./m-sign-up-success.component.scss']
})
export class MSignUpSuccessComponent implements OnInit {

  datadata: any;
  constructor(private auth: TokenService,  private router: Router, public shared: ShareService) { }

  ngOnInit() {
    // const tg = this.shared.shareData;
    // this.datadata = tg.email;
    // console.log(this.shared.shareData.email);
  }
  kolonel() {
    if (!this.auth.getUser()) {
    //  console.log('ini ada');
    } else {
    // console.log('tidak ada');
    }
  }
}
