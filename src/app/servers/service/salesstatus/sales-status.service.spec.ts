import { TestBed, inject } from '@angular/core/testing';

import { SalesStatusService } from './sales-status.service';

describe('SalesStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesStatusService]
    });
  });

  it('should be created', inject([SalesStatusService], (service: SalesStatusService) => {
    expect(service).toBeTruthy();
  }));
});
