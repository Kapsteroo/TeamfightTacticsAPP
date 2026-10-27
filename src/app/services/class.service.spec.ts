import { TestBed } from '@angular/core/testing';
import { firebaseStubProviders } from '../../testing/firebase-stubs';

import { ClassService } from './class.service';

describe('ClassService', () => {
  let service: ClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: firebaseStubProviders });
    service = TestBed.inject(ClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
