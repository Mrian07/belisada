import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductsSandbox } from './products.sandbox';


@Injectable()
export class ProductsResolver implements Resolve<any> {

  constructor(
    public productsSandbox: ProductsSandbox,
  ) {}

  /**
   * Triggered when application hits product details route.
   * It subscribes to product list data and finds one with id from the route params.
   *
   * @param route
   */
  public resolve(route: ActivatedRouteSnapshot) {
    // this.productsSandbox.loadProductDetails(+route.params.id, route.queryParams);
    // this.productsSandbox.loadProductDetailsPrice(+route.params.id, route.queryParams);
    // this.productsSandbox.loadProductDetailsStore(+route.params.id, route.queryParams);
    // this.productsSandbox.loadProductDetailsVariant(+route.params.id);
  }
}
