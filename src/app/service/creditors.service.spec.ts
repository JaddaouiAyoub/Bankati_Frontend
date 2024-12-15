import { TestBed } from '@angular/core/testing';

import { CreditorsService } from './creditors.service';

describe('CreditorsService', () => {
  let service: CreditorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
