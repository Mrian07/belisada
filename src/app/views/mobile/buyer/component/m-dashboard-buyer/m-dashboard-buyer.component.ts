import { WishlistBuyerService } from '../../../../../core/service/wishlist-buyer/wishlist-buyer.service';
import { ProductService } from '../../../../../core/service/product/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-m-dashboard-buyer',
  templateUrl: './m-dashboard-buyer.component.html',
  styleUrls: ['./m-dashboard-buyer.component.scss']
})
export class MDashboardBuyerComponent implements OnInit {

  productList: any[];
  readonly: any;
  rating: any;
  dat: any[];
  po;
  id;
  constructor(private router: Router,
    private productService: ProductService, private iniserviceyah: WishlistBuyerService) { }

  ngOnInit() {
    this.allProduct();
    this.fils3();
  }
  fils3() {
    this.iniserviceyah.getAll().subscribe(data => {
      this.dat = data;
      // console.log('ini apa sih ', data);
    });
  }
  allProduct() {
    this.productService.AllNewProduct().subscribe(response => {
      this.productList = response;
      // console.log('ini', this.productList);
    });
  }
  detail(id: number, alias: string) {
    this.router.navigateByUrl('/Product-detail/' + id + '/' + alias);
  }
  btnDelete(id) {
    swal({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.iniserviceyah.delete(id).subscribe(data => {
          this.po = data;
          // console.log(data);
          // alert('keapus bro');
          this.fils3();
        });
      }
    });

}

}
