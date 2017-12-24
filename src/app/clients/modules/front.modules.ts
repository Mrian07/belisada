import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCarousel } from 'ngx-carousel/src/ngx-carousel/ngx-carousel.interface';
import { NgxCarouselModule } from 'ngx-carousel/src/ngx-carousel.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModules } from './shared.modules';
import { SearchService } from 'ng2-semantic-ui/dist';

import 'hammerjs';
import { FrontLayoutComponent } from '../layouts/front-layout/front-layout.component';
import { HomeComponent } from '../pages/front/home/home.component';
import { FrontHeaderComponent } from '../components/front/front-header/front-header.component';
import { FrontSlideShowComponent } from '../components/front/front-slide-show/front-slide-show.component';
import { FrontNavComponent } from '../components/front/front-nav/front-nav.component';
import { FrontGridCarouselComponent } from '../components/front/front-grid-carousel/front-grid-carousel.component';
import { FrontFooterComponent } from '../components/front/front-footer/front-footer.component';
import { ProductDetailComponent } from '../pages/front/product-detail/product-detail.component';
import { HomeService } from '../../servers/service/home/home.service';
@NgModule({
  declarations: [
    FrontLayoutComponent,
    HomeComponent,
    FrontHeaderComponent,
    FrontNavComponent,
    FrontSlideShowComponent,
    FrontGridCarouselComponent,
    FrontFooterComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    NgxCarouselModule,
    RouterModule,
    FormsModule,
    SharedModules
  ],
  providers: [
    NgxCarousel,
    HomeService
  ]
})
export class FrontModules { }
