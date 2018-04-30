import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthSellerComponent, SignInSellerComponent } from '@belisada/features/auth-seller';

const routes: Routes = [
  {
    path: '',
    component: AuthSellerComponent,
    children: [
      {
        path: 'sign-in-seller',
        component: SignInSellerComponent,
        data: {
          title: 'Sign In Seller'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthSellerRoutingModule { }
