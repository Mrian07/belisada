import { TestBed, inject } from '@angular/core/testing';

import { RekeningSService } from './rekening-s.service';

describe('RekeningSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RekeningSService]
    });
  });

  it('should be created', inject([RekeningSService], (service: RekeningSService) => {
    expect(service).toBeTruthy();
  }));
});
