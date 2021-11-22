import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Patch } from '../models/patch';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatchService {
  patchesCollection: AngularFirestoreCollection<Patch>;
  patches: Observable<Patch[]>;

  constructor(public afs: AngularFirestore) {
    this.patchesCollection = afs.collection('patches');
    // this.patches = this.patchesCollection.valueChanges();
    this.patches = this.patchesCollection.snapshotChanges().pipe(map(changes => { //here we can get id from database (using value changes it could work)
      return changes.map(a => {
        const data = a.payload.doc.data() as Patch;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    };

  getPatches() {
    return this.patches;
  }

}

