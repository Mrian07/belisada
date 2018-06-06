import { SearchResultComponent } from './search-result.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreListComponent } from './store-list/store-list.component';

const routes: Routes = [
  {
    path: '',
    component: SearchResultComponent,
    children: [
      {
        path: 'product-list',
        component: ProductListComponent,
        data: {
            title: 'Product List'
        }
      },
      {
        path: 'store-list',
        component: StoreListComponent,
        data: {
            title: 'Store List'
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchResultRoutingModule { }
