import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../model/product';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../config/configuration';

@Injectable()
export class ProductService {
  // private products: Observable<Product[]>;
  // private product: Observable<Product>;

  constructor(private http: HttpClient, private configuration: Configuration) { }

    public get(productId: number): Observable<Product> {
    return this.http.get(this.configuration.serverWithAccUrl + '/product/detail/simple/' + productId)
        .map(response => response as Product);
    }

    ProductNew(id: number): Observable<Product> {
    return this.http.get(this.configuration.serverWithAccUrl + '/product/search?parent=1&itemperpage=12&ob=5&id=' + id)
        .map(resp => resp as Product);
    }

    AllNewProduct(): Observable<Product[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/product/new')
        .map(resp => resp as Product[]);
    }
}
