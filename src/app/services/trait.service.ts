import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Trait } from '../models/trait';

@Injectable({
  providedIn: 'root',
})
export class TraitService {
  traitsCollection: AngularFirestoreCollection<Trait>;
  traits: Observable<Trait[]>;

  constructor(public afs: AngularFirestore) {
    this.traitsCollection = afs.collection<Trait>('traits');
    this.traits = this.traitsCollection.valueChanges({ idField: 'id' });
  }

  getTraits() {
    return this.traits;
  }
}
