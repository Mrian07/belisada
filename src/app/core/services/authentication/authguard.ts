import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivateChild } from '@angular/router/src/interfaces';
import { Router } from '@angular/router';


@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivateChild {
  constructor( private router: Router) {
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = localStorage.getItem('token');
    if (!user) {
      this.router.navigateByUrl('/account/sign-in');
      return false;
    } else {
      return true;
    }
  }
}
