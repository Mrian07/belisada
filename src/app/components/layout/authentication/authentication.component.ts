import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  href: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  goToSignIn() {
    this.router.navigateByUrl('/authentication/sign-in');
    // location.reload();
    this.href = this.router.url;
        console.log(this.router.url);
  }
  goToSignUp() {
    this.router.navigateByUrl('/authentication/sign-up');
    // location.reload();
    this.href = this.router.url;
        console.log(this.router.url);
  }

}
