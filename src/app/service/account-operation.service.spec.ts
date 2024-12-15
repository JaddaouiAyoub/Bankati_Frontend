import { TestBed } from '@angular/core/testing';

import { AccountOperationService } from './account-operation.service';

describe('AccountOperationService', () => {
  let service: AccountOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
