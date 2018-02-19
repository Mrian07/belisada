import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MWishlistBuyerComponent } from './m-wishlist-buyer.component';

describe('MWishlistBuyerComponent', () => {
  let component: MWishlistBuyerComponent;
  let fixture: ComponentFixture<MWishlistBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MWishlistBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MWishlistBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
