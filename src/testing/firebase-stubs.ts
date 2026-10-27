import { Provider } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, of } from 'rxjs';

/** Minimal AngularFirestore collection/document stub returning empty data. */
function collectionStub(): any {
  return {
    valueChanges: () => of([]),
    snapshotChanges: () => of([]),
    add: jasmine.createSpy('add').and.resolveTo({}),
    doc: () => ({
      collection: () => collectionStub(),
      set: jasmine.createSpy('set').and.resolveTo(),
      delete: jasmine.createSpy('delete').and.resolveTo(),
      valueChanges: () => of(undefined),
    }),
  };
}

export class AngularFirestoreStub {
  collection = jasmine.createSpy('collection').and.callFake(() => collectionStub());
}

export class AngularFireAuthStub {
  readonly authState = new BehaviorSubject<any>(null);
  readonly user = this.authState.asObservable();
  signInWithEmailAndPassword = jasmine
    .createSpy('signInWithEmailAndPassword')
    .and.resolveTo({});
  createUserWithEmailAndPassword = jasmine
    .createSpy('createUserWithEmailAndPassword')
    .and.resolveTo({ user: null });
  signOut = jasmine.createSpy('signOut').and.resolveTo();
}

export const firebaseStubProviders: Provider[] = [
  { provide: AngularFirestore, useClass: AngularFirestoreStub },
  { provide: AngularFireAuth, useClass: AngularFireAuthStub },
];
