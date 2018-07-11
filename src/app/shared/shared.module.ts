// import { FilterPipe } from './pipes/filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ModelsComponent } from '@belisada/shared/components/models/models.component';
import { ClickOutsideDirective, ADirective } from '@belisada/shared/directives';
// import { FilterPipe } from '@belisada/shared/pipes';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ClickOutsideDirective
    // FilterPipe
  ]
})
export class SharedModule { }
