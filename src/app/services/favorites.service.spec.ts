import { TestBed } from '@angular/core/testing';
import { firebaseStubProviders } from '../../testing/firebase-stubs';

import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: firebaseStubProviders });
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
