import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FavTeam } from '../models/favTeam';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favoritesCollection: AngularFirestoreCollection<FavTeam>;
  teams: Observable<FavTeam[]>;
  userID: string;

  constructor(public afs: AngularFirestore) {
    // this.teams = this.favoritesCollection
    //   .doc(uid)
    //   .collection('teams')
    //   .snapshotChanges()
    //   .pipe(
    //     map((changes) => {
    //       return changes.map((a) => {
    //         const data = a.payload.doc.data() as FavTeam;
    //         return data;
    //       });
    //     })
    //   );
  }

  getFavTeams() {
    return this.teams;
  }

  setCollection(uid?: string) {
    this.favoritesCollection = this.afs
      .collection('favorites')
      .doc(uid)
      .collection('teams');
    this.teams = this.favoritesCollection
      .doc(uid)
      .collection('teams')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((a) => {
            const data = a.payload.doc.data() as FavTeam;
            return data;
          });
        })
      );
  }

  addFavTeam(team: FavTeam) {
    this.favoritesCollection.add(team);
  }
}
