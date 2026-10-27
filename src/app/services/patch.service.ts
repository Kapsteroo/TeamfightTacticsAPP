import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Patch } from '../models/patch';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatchService {
  patchesCollection: AngularFirestoreCollection<Patch>;
  patches: Observable<Patch[]>;

  constructor(public afs: AngularFirestore) {
    this.patchesCollection = afs.collection('patches');
    this.patches = this.patchesCollection.valueChanges();
  }

  getPatches() {
    return this.patches;
  }

  addPatch(patch: Patch) {
    return this.patchesCollection.add(patch);
  }
}
