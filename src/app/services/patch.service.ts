import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Patch } from '../models/patch';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatchService {
  patchesCollection: AngularFirestoreCollection<Patch>;
  patches: Observable<Patch[]>;

  constructor(public afs: AngularFirestore) {
    this.patches = this.afs.collection('patches').valueChanges();
   }

  getPatches() {
    return this.patches;
  }
}

