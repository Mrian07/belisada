import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '@belisada/shared/directives';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ClickOutsideDirective
  ]
})
export class SharedModule { }
