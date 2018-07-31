import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtalaseTokoComponent } from '@belisada/features/buyer/store/etalase-toko/etalase-toko.component';

const routes: Routes = [
  { path: 'etalase-toko', component: EtalaseTokoComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
