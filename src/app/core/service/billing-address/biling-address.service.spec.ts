import { TestBed, inject } from '@angular/core/testing';

import { BilingAddressService } from './biling-address.service';

describe('BilingAddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BilingAddressService]
    });
  });

  it('should be created', inject([BilingAddressService], (service: BilingAddressService) => {
    expect(service).toBeTruthy();
  }));
});
