import { TestBed, inject } from '@angular/core/testing';

import { FreightRateService } from './freight-rate.service';

describe('FreightRateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreightRateService]
    });
  });

  it('should be created', inject([FreightRateService], (service: FreightRateService) => {
    expect(service).toBeTruthy();
  }));
});
