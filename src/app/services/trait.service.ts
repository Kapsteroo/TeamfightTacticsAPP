import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Trait } from '../models/trait';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TraitService {
  traitsCollection: AngularFirestoreCollection<Trait>;
  traits: Observable<Trait[]>;

  constructor(public afs: AngularFirestore) {
    this.traitsCollection = afs.collection('traits');
    this.traits = this.traitsCollection.snapshotChanges().pipe(
      map((changes) => {
        //here we can get id from database (using value changes it could work)
        return changes.map((a) => {
          const data = a.payload.doc.data() as Trait;
          // data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getTraits() {
    return this.traits;
  }
}
