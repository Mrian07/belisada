import { TestBed, inject } from '@angular/core/testing';

import { TransactionListService } from './transaction-list.service';

describe('TransactionListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionListService]
    });
  });

  it('should be created', inject([TransactionListService], (service: TransactionListService) => {
    expect(service).toBeTruthy();
  }));
});
