import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../servers/service/login/login.service';
import { CanActivateChild } from '@angular/router/src/interfaces';
import { Router } from '@angular/router';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivateChild {
  constructor(private userService: LoginService, private router: Router) {
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigateByUrl('/login');
      return false;
    }else {
      return true;
    }
   // this.router.navigate([this.returnUrl]);
  //  console.log(this.userService.isLoggedin());
  //   if (this.userService.isLoggedin()) {
  //     return true;
  //   } else {
  //     window.alert('You dont have permission to view this page');
  //     return false;
  //   }
  }
}
