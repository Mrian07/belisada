import { TestBed, inject } from '@angular/core/testing';

import { EmailNewsLetterService } from './email-news-letter.service';

describe('EmailNewsLetterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailNewsLetterService]
    });
  });

  it('should be created', inject([EmailNewsLetterService], (service: EmailNewsLetterService) => {
    expect(service).toBeTruthy();
  }));
});
