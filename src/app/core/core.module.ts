import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { HomeComponent } from './../components/home/home.component';
import { LayoutComponent } from './../components/layout/layout.component';
import { throwIfAlreadyLoaded } from './module-import.guard';
// import { UserComponent } from './services/models/user/user';

import { CoreRoutingModule } from './core.routing';
import { HeaderComponent } from './../components/layout/header/header.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    // HomeComponent
  ],
  providers: [],
  // declarations: [],
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
