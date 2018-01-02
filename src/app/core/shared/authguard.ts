import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivateChild } from '@angular/router/src/interfaces';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';


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
  }
}
