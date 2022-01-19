import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Champion } from '../models/champion';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChampionService {
  championsCollection: AngularFirestoreCollection<Champion>;
  champions: Observable<Champion[]>;

  constructor(public afs: AngularFirestore) {
    this.championsCollection = afs.collection('champions');
    this.champions = this.championsCollection.snapshotChanges().pipe(
      map((changes) => {
        //here we can get id from database (using value changes it could work)
        return changes.map((a) => {
          const data = a.payload.doc.data() as Champion;
          // data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getChampions() {
    return this.champions;
  }
}
