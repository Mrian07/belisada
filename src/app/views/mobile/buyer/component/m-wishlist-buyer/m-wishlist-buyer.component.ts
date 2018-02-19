import { WishlistBuyerService } from '../../../../../core/service/wishlist-buyer/wishlist-buyer.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-m-wishlist-buyer',
  templateUrl: './m-wishlist-buyer.component.html',
  styleUrls: ['./m-wishlist-buyer.component.scss']
})
export class MWishlistBuyerComponent implements OnInit {

  readonly: any;
  rating: any;
  dat: any[];
  po;
  id;
  constructor(private iniserviceyah: WishlistBuyerService) { }

  ngOnInit() {
    this.fils3();
    // this.btnDelete(this.id);
  }
  fils3() {
    this.iniserviceyah.getAll().subscribe(data => {
      this.dat = data;
    });
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
          this.fils3();
        });
      }
    });

}
}
