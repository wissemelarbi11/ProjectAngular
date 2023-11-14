import { TestBed } from '@angular/core/testing';

import { SoustacheService } from './soustache.service';

describe('SoustacheService', () => {
  let service: SoustacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoustacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
