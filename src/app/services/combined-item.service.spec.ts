import { TestBed } from '@angular/core/testing';
import { firebaseStubProviders } from '../../testing/firebase-stubs';

import { CombinedItemService } from './combined-item.service';

describe('CombinedItemService', () => {
  let service: CombinedItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: firebaseStubProviders });
    service = TestBed.inject(CombinedItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
