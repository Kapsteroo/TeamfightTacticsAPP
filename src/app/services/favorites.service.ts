import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { FavTeam } from '../models/favTeam';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

  private teamsCollection(uid: string) {
    return this.afs
      .collection('favorites')
      .doc(uid)
      .collection<Omit<FavTeam, 'id'>>('teams');
  }

  getFavTeams(): Observable<FavTeam[]> {
    // Follow the auth state instead of reading a uid that may not be known yet.
    return this.afAuth.authState.pipe(
      switchMap((user) =>
        user
          ? this.teamsCollection(user.uid)
              .snapshotChanges()
              .pipe(
                map((changes) =>
                  changes.map((a) => ({
                    ...a.payload.doc.data(),
                    id: a.payload.doc.id,
                  }))
                )
              )
          : of([])
      )
    );
  }

  async addFavTeam(team: Omit<FavTeam, 'id'>): Promise<void> {
    const user = await this.afAuth.authState.pipe(take(1)).toPromise();
    if (!user) throw new Error('User is not logged in');
    await this.teamsCollection(user.uid).add({ team: team.team });
  }

  async removeFavTeam(team: FavTeam): Promise<void> {
    const user = await this.afAuth.authState.pipe(take(1)).toPromise();
    if (!user) throw new Error('User is not logged in');
    await this.teamsCollection(user.uid).doc(team.id).delete();
  }
}
