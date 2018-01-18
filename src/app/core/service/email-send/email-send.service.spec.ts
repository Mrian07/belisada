import { TestBed, inject } from '@angular/core/testing';

import { EmailSendService } from './email-send.service';

describe('EmailSendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailSendService]
    });
  });

  it('should be created', inject([EmailSendService], (service: EmailSendService) => {
    expect(service).toBeTruthy();
  }));
});
