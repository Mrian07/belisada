import { SearchResultComponent } from './search-result.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchResultRoutingModule { }
