import { TestBed, inject } from '@angular/core/testing';

import { RepiewServiceService } from './repiew-service.service';

describe('RepiewServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepiewServiceService]
    });
  });

  it('should be created', inject([RepiewServiceService], (service: RepiewServiceService) => {
    expect(service).toBeTruthy();
  }));
});
