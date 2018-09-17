import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '@belisada/shared/directives';
import { EllipsisPipe } from '@belisada/shared/pipes/ellipsis.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ClickOutsideDirective,
    EllipsisPipe
  ],
  exports: [
    EllipsisPipe
  ]
})
export class SharedModule { }
