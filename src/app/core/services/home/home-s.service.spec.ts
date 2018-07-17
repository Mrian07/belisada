import { TestBed, inject } from '@angular/core/testing';

import { HomeSService } from './home-s.service';

describe('HomeSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeSService]
    });
  });

  it('should be created', inject([HomeSService], (service: HomeSService) => {
    expect(service).toBeTruthy();
  }));
});
