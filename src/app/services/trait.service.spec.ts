import { TestBed } from '@angular/core/testing';
import { firebaseStubProviders } from '../../testing/firebase-stubs';

import { TraitService } from './trait.service';

describe('TraitService', () => {
  let service: TraitService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: firebaseStubProviders });
    service = TestBed.inject(TraitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
