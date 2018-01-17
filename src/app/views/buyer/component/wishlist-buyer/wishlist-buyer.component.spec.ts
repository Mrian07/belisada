import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistBuyerComponent } from './wishlist-buyer.component';

describe('WishlistBuyerComponent', () => {
  let component: WishlistBuyerComponent;
  let fixture: ComponentFixture<WishlistBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
