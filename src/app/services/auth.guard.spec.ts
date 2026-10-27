import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { AngularFireAuthStub, firebaseStubProviders } from '../../testing/firebase-stubs';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let auth: AngularFireAuthStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: firebaseStubProviders,
    });
    guard = TestBed.inject(AuthGuard);
    auth = TestBed.inject(AngularFireAuth) as unknown as AngularFireAuthStub;
  });

  it('allows logged-in users', (done) => {
    auth.authState.next({ uid: '123' });
    (guard.canActivate() as Observable<boolean | UrlTree>).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('redirects anonymous users to the login page', (done) => {
    const router = TestBed.inject(Router);
    (guard.canActivate() as Observable<boolean | UrlTree>).subscribe((result) => {
      expect(router.serializeUrl(result as UrlTree)).toBe('/log-in');
      done();
    });
  });
});
