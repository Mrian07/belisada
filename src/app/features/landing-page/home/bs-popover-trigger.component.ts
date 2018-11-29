import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BannerMainLink } from '@belisada/core/models/banner/banner.model';

@Component({
  selector: 'bs-popover-trigger',
  template: `
    <button class="trigger" (mouseenter)="mouseEnter(i)" (mouseleave)="mouseLeave(i)" *ngFor="let item of links; let i = index"
      [ngStyle]="{'left': item.x + '%', 'top': item.y +'%'}">
      <a [routerLink]="[item.url]">
        <div class="popover" [ngStyle]="{'display': (i === selectedIndex) ? 'block' : 'none'}">
          <h2 class="popover__name">
            {{ item.name }}
          </h2>
          <div class="popover__image">
            <img>IMAGE
          </div>
          <div class="popover__price">
              Rp 10000000
          </div>
          <div class="popover__desc">
            {{ item.description }}
          </div>
        </div>
      </a>
    </button>`,
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BsPopoverTriggerComponent {
  @Input() links: BannerMainLink[];

  public selectedIndex: number;

  mouseEnter(index: number) {
    console.log('mouse enter : ' + index);
    this.selectedIndex = index;
  }

  mouseLeave(index: number) {
    console.log('mouse leave :' + index);
    this.selectedIndex = undefined;
  }
}
