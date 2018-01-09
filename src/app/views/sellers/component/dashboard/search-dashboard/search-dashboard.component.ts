import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ActiveLink } from '../../../../../core/service/shared.service';
import { StoreService } from '../../../../../core/service/store/store.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-search-dashboard',
  templateUrl: './search-dashboard.component.html',
  styleUrls: ['./search-dashboard.component.scss']
})
export class SearchDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private title: Title,
    private active: ActiveLink,
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Dashboard');
  }
  search(event) {
    const key = event.target.value;
  }

  addProducts() {
    this.storeService.getAll().subscribe(response => {
      if (response.length === 0) {
        swal(
          'Anda belum membuat Toko!',
          'klik OK untuk melanjutkan'
        ).then((result) => {
          this.router.navigateByUrl('seller/toko');
        });
      }else {
        this.router.navigate(['seller/add-products/add']);
      }
    });
  }

}
