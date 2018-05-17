import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product: Product = new Product();

  constructor() { }

  ngOnInit() {
  }

  
}
