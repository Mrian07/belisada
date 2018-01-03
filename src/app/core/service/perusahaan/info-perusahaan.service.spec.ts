import { TestBed, inject } from '@angular/core/testing';

import { InfoPerusahaanService } from './info-perusahaan.service';

describe('InfoPerusahaanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoPerusahaanService]
    });
  });

  it('should be created', inject([InfoPerusahaanService], (service: InfoPerusahaanService) => {
    expect(service).toBeTruthy();
  }));
});
