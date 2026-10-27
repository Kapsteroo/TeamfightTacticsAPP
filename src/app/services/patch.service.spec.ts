import { TestBed } from '@angular/core/testing';
import { firebaseStubProviders } from '../../testing/firebase-stubs';

import { PatchService } from './patch.service';

describe('PatchService', () => {
  let service: PatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: firebaseStubProviders });
    service = TestBed.inject(PatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
