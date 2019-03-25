import { Component, Input, HostListener, ViewEncapsulation, ElementRef, Output, EventEmitter } from '@angular/core';
import { Category } from '@belisada/core/models/category/category.model';
import { environment } from '@env/environment';
import { UserData } from '@belisada/core/models';

@Component({
  selector: 'bs-account-menu',
  template: `
    <li class="accounts__trigger">
      <img class="accounts__avatar" [src]="thumborProfilePicture + userData.avatar" alt="">
      <span class="accounts__name">{{ userData.name }} <fa-icon [icon]="['fas', 'caret-down']"></fa-icon></span>
      <ul class="accounts__menus" [ngClass]="{'show': accountMenuShow}">
          <a [routerLink]="['/buyer/profile']"><li>Profile</li></a>
          <a [routerLink]="['/buyer/order']"><li>Pesananku</li></a>
          <li (click)="logout()">Logout</li>
      </ul>
    </li>
  `,
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountMenuComponent {
  public accountMenuShow: boolean;
  public thumborProfilePicture: string;
  private _userData: UserData;

  // @Input() userData: UserData;
  @Output() logedOut = new EventEmitter<boolean>();

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.accountMenuShow = true;
    } else {
      this.accountMenuShow = false;
    }
  }

  constructor(private eRef: ElementRef) {
    this.accountMenuShow = false;
    this.thumborProfilePicture = environment.thumborUrl + 'unsafe/50x50/center/filters:fill(fff)/';
    // this.userData = new UserData();
  }

  public logout() {
    this.logedOut.emit();
    this.accountMenuShow = false;
  }

  get userData(): UserData {
    return this._userData;
  }

  @Input()
  set userData(userData: UserData) {
    this._userData = userData;
    console.log('imgaenya', userData);
  }
}
