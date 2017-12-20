import { TestBed, inject } from '@angular/core/testing';

import { MyTopProductService } from './my-top-product.service';

describe('MyTopProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTopProductService]
    });
  });

  it('should be created', inject([MyTopProductService], (service: MyTopProductService) => {
    expect(service).toBeTruthy();
  }));
});
