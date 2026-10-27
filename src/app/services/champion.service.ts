import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Champion } from '../models/champion';

@Injectable({
  providedIn: 'root',
})
export class ChampionService {
  championsCollection: AngularFirestoreCollection<Champion>;
  champions: Observable<Champion[]>;

  constructor(public afs: AngularFirestore) {
    this.championsCollection = afs.collection<Champion>('champions');
    this.champions = this.championsCollection.valueChanges({ idField: 'id' });
  }

  getChampions() {
    return this.champions;
  }
}
