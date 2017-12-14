import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './seller/dashboard/dashboard.component';

@NgModule({
  imports: [ PagesRoutingModule ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    DashboardComponent
  ]
})
export class ViewsModule { }
