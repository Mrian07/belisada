import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event.component';
import { ProductListEventComponent } from './product-list-event/product-list-event.component';

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      {
        path: '',
        component: ProductListEventComponent,
        data: {
          title: 'Event'
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
