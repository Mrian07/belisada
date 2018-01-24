import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UpgradeService } from './../../../../core/service/upgrade/upgrade.service';
import { LoginService } from '../../../../core/service/login/login.service';

@Component({
  selector: 'app-seller-propose',
  templateUrl: './seller-propose.component.html',
  styleUrls: ['./seller-propose.component.scss']
})
export class SellerProposeComponent implements OnInit {

  constructor(
    private router: Router,
    private upgradeService: UpgradeService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {

  }

  agree() {

    const user = JSON.parse(localStorage.user);
    this.router.navigateByUrl('/buyer/dashboard');

    const data = {
      userType: '1'
    };
    this.upgradeService.upToSeller(data).subscribe(response => {
      this.upgradeService.changeToken().subscribe(dataToken => {

        this.loginService.user = dataToken;
        localStorage.user = JSON.stringify(dataToken);
        this.router.navigateByUrl('/seller/new-seller');

      });
    });

  }
}
