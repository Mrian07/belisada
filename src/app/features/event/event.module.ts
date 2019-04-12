import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { ThemeModule } from 'app/theme/theme.module';
import { ProductListEventComponent } from './product-list-event/product-list-event.component';


library.add(fas, far, fab);



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    FontAwesomeModule,
    EventRoutingModule,
    ThemeModule
  ],
  declarations: [EventComponent, ProductListEventComponent],
})
export class EventModule { }
