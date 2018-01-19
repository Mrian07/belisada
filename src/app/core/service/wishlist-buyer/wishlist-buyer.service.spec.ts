import { TestBed, inject } from '@angular/core/testing';

import { WishlistBuyerService } from './wishlist-buyer.service';

describe('WishlistBuyerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishlistBuyerService]
    });
  });

  it('should be created', inject([WishlistBuyerService], (service: WishlistBuyerService) => {
    expect(service).toBeTruthy();
  }));
});
