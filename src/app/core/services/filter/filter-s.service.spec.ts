import { TestBed, inject } from '@angular/core/testing';

import { FilterSService } from './filter-s.service';

describe('FilterSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterSService]
    });
  });

  it('should be created', inject([FilterSService], (service: FilterSService) => {
    expect(service).toBeTruthy();
  }));
});
