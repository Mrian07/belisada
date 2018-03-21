import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { HomeComponent } from './../components/home/home.component';
import { LayoutComponent } from './../components/layout/layout.component';
import { throwIfAlreadyLoaded } from './module-import.guard';
// import { UserComponent } from './services/models/user/user';

import { CoreRoutingModule } from './core.routing';
import { SaniComponent } from './../components/sani/sani.component';
import { FooterComponent } from './../components/layout/footer/footer.component';
import { HeaderComponent } from './../components/layout/header/header.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SaniComponent
    // HomeComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    CoreRoutingModule,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
