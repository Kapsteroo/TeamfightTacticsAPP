import { TestBed } from '@angular/core/testing';
import { firebaseStubProviders } from '../../testing/firebase-stubs';

import { BaseItemService } from './base-item.service';

describe('BaseItemService', () => {
  let service: BaseItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: firebaseStubProviders });
    service = TestBed.inject(BaseItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
