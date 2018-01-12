import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BuyerLayoutComponent } from '../../../core/layout/buyer-layout/buyer-layout.component';
import { DashboardBuyerComponent } from '../../buyer/component/dashboard-buyer/dashboard-buyer.component';
import { BuyerDashboardComponent } from '../component/buyer-dashboard/buyer-dashboard.component';
import { SidebarBuyerComponent } from '../../buyer/component/sidebar-buyer/sidebar-buyer.component';
import { ShipingAddressComponent } from '../component/buyer-dashboard/shiping-address/shiping-address.component';


const buyerroutes: Routes = [
  {

    path: 'buyer',
    component: BuyerLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardBuyerComponent,
        data: {
          title: 'home'
        }
      },
    ]
  },
  {
    path: 'buyer/dashboard',
    component: BuyerDashboardComponent,
    data: {
      title: 'Buyer Dashboard'
    }
  },
  {
    path: 'buyer/sidebar',
    component: SidebarBuyerComponent,
    data: {
      title: 'Buyer Dashboard'
    }
  },
  {
    path: 'buyer/shiping-address',
    component: ShipingAddressComponent,
    data: {
      title: 'Buyer Dashboard'
    }
  }
];

@NgModule ({
  imports: [RouterModule.forChild(buyerroutes)],
  exports: [RouterModule]
})
export class BuyerRoutes { }
