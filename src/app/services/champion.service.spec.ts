import { TestBed } from '@angular/core/testing';
import { firebaseStubProviders } from '../../testing/firebase-stubs';

import { ChampionService } from './champion.service';

describe('ChampionService', () => {
  let service: ChampionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: firebaseStubProviders });
    service = TestBed.inject(ChampionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
