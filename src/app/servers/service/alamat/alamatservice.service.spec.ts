import { TestBed, inject } from '@angular/core/testing';

import { AlamatserviceService } from './alamatservice.service';

describe('AlamatserviceServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlamatserviceService]
    });
  });

  it('should be created', inject([AlamatserviceService], (service: AlamatserviceService) => {
    expect(service).toBeTruthy();
  }));
});
