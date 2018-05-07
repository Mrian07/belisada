import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from '@belisada/features/features.component';
import { HomeComponent } from '@belisada/features/landing-page/home/home.component';
import { LayoutComponent } from '../components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        {
        path: '',
        component: HomeComponent,
        data: {
          title: 'Home'
        }
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
