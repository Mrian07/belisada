import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtalaseTokoComponent } from '@belisada/features/buyer/store/etalase-toko/etalase-toko.component';
import { AnotherOfferComponent } from '@belisada/features/product/another-offer/another-offer.component';
const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'product-detail/:id/:name',
        component: ProductDetailComponent,
        data: {
            title: 'Product Detail'
        }
      },

      {
        path: 'another-offer/:id/:name',
        component: AnotherOfferComponent,
        data: {
            title: 'Penawaran Lain'
        }
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
