import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UpgradeService } from './../../../../core/service/upgrade/upgrade.service';

@Component({
  selector: 'app-seller-propose',
  templateUrl: './seller-propose.component.html',
  styleUrls: ['./seller-propose.component.scss']
})
export class SellerProposeComponent implements OnInit {

  constructor(
    private router: Router,
    private upgradeService: UpgradeService,
  ) { }

  ngOnInit() {

  }

  agree() {

    const user = JSON.parse(localStorage.user);
    this.router.navigateByUrl('/buyer/dashboard');

    if (user.role === 3 || user.role === 2) {
      this.router.navigateByUrl('/seller/dashboard');
    } else {

        const data = {
          userType: '1'
        };
        this.upgradeService.upToSeller(data).subscribe(response => {
          this.router.navigateByUrl('/seller/dashboard');
        });

    }



  }
}
