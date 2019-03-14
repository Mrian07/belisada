import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BannerMainLink } from '@belisada/core/models/banner/banner.model';

@Component({
  selector: 'bs-popover-trigger',
  template: `
    <button class="trigger" (mouseenter)="mouseEnter(i)" (mouseleave)="mouseLeave(i)" *ngFor="let item of links; let i = index"
      [ngStyle]="{'left': item.x + '%', 'top': item.y +'%'}">
      <a [routerLink]="['/product/product-detail/' + item.productId + '/' + (item.name)]">
        <div class="popover" [ngStyle]="{'display': (i === selectedIndex) ? 'block' : 'none'}">
          <h2 class="popover__name">
            {{ item.name }}
          </h2>
          <div class="popover__image">
            <img [src]="item.imageUrl" [alt]="item.imageUrl">
          </div>
          <div class="popover__price">
            {{ item.fixPrice | currency:'Rp ':'symbol':'1.0' }}
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
    this.selectedIndex = index;
  }

  mouseLeave(index: number) {
    this.selectedIndex = undefined;
  }
}
