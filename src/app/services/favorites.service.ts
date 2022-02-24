import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FavTeam } from '../models/favTeam';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favoritesCollection: AngularFirestoreCollection<FavTeam>;
  teams: Observable<FavTeam[]>;
  teamDoc: AngularFirestoreDocument<FavTeam>;

  constructor(public afs: AngularFirestore, private authService: AuthService) {
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
    this.setCollection();
    return this.teams;
  }

  setCollection() {
    var uid = this.authService.getUserID();
    this.favoritesCollection = this.afs
      .collection('favorites')
      .doc(uid)
      .collection('teams');
    this.teams = this.favoritesCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as FavTeam;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  addFavTeam(team: FavTeam) {
    this.setCollection();
    this.favoritesCollection.add(team);
  }

  removeFavTeam(team: FavTeam) {
    this.setCollection();
    var uid = this.authService.getUserID();
    this.teamDoc = this.afs
      .collection('favorites')
      .doc(uid)
      .collection('teams')
      .doc(team.id);
    this.teamDoc.delete();
  }
}
