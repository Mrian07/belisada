// import { NgModule } from '@angular/core';
// import { Routes } from '@angular/router';
// import { RouterModule } from '@angular/router';
// import { BuyerLayoutComponent } from '../../../core/layout/buyer-layout/buyer-layout.component';
// import { DashboardBuyerComponent } from '../../buyer/component/dashboard-buyer/dashboard-buyer.component';
// import { SidebarBuyerComponent } from '../../buyer/component/sidebar-buyer/sidebar-buyer.component';
// import { BuyerDashboardComponent } from '../../front/component/buyer-dashboard/buyer-dashboard.component';
// import { ShipingAddressComponent } from '../../front/component/buyer-dashboard/shiping-address/shiping-address.component';
// import { ChangePasswordBuyerComponent } from '../component/change-password-buyer/change-password-buyer.component';
// import { BillingAddressComponent } from '../component/billing-address/billing-address.component';
// import { ShippingAddressComponent } from '../component/shipping-address/shipping-address.component';
// import { ProductTopBuyerComponent } from '../component/product-top-buyer/product-top-buyer.component';
// import { ProfileBuyerComponent } from '../component/profile-buyer/profile-buyer.component';
// import { WishlistBuyerComponent } from '../component/wishlist-buyer/wishlist-buyer.component';
// import { TransactionBuyerComponent } from '../component/transaction-buyer/transaction-buyer.component';
// import { OrderDetailBuyerComponent } from '../component/order-detail-buyer/order-detail-buyer.component';
// import { ConfirmationBuyerComponent } from '../component/confirmation-buyer/confirmation-buyer.component';


// const buyerroutes: Routes = [
//     {
//     path: '',
//     component: BuyerLayoutComponent,
//     children: [
//       {
//         path: 'dashboard',
//         component: DashboardBuyerComponent,
//         data: {
//           title: 'home'
//         }
//       },
//       {
//         path: 'change-password',
//         component: ChangePasswordBuyerComponent,
//         data: {
//           title: 'Change Password'
//         }
//       },
//       {
//         path: 'tet',
//         component: BillingAddressComponent,
//         data: {
//           title: 'Change Password'
//         }
//       },
//       {
//         path: 'shippingAddress',
//         component: ShippingAddressComponent,
//         data: {
//           title: 'Change Password'
//         }
//       }, {
//         path: 'product-top-buyer/:id',
//         component: ProductTopBuyerComponent,
//         data: {
//           title: 'Product Top Buyer'
//         }
//       },
//       {
//         path: 'profile-buyer',
//         component: ProfileBuyerComponent,
//         data: {
//           title: 'Profile Buyer'
//         }
//       },
//       {
//         path: 'wishlist-buyer',
//         component: WishlistBuyerComponent,
//         data: {
//           title: 'Profile Buyer'
//       }
//     },
//       {
//         path: 'transaction-buyer',
//         component: TransactionBuyerComponent,
//         data: {
//           title: 'Transaction Buyer'
//         }
//       },
//         {
//         path: 'order-detail-buyer',
//         component: OrderDetailBuyerComponent,
//         data: {
//           title: 'Order Detail Buyer'
//         }
//       }, {
//         path: 'confirmation-buyer',
//         component: ConfirmationBuyerComponent,
//         data: {
//           title: 'Confirmation Buyer'
//         }
//       }
//     ]
//   }
// ];

// @NgModule ({
//   imports: [RouterModule.forChild(buyerroutes)],
//   exports: [RouterModule]
// })
// export class BuyerRoutes { }
