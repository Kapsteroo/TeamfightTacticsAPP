import { TestBed } from '@angular/core/testing';

import { CombinedItemService } from './combined-item.service';

describe('CombinedItemService', () => {
  let service: CombinedItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombinedItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
