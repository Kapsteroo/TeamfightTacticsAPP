import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  canActivate(): Observable<boolean | UrlTree> {
    // authState emits once Firebase has restored the session, so a page refresh
    // on a guarded route no longer bounces a logged-in user back to /home.
    return this.afAuth.authState.pipe(
      take(1),
      map((user) => (user ? true : this.router.createUrlTree(['/log-in'])))
    );
  }
}
