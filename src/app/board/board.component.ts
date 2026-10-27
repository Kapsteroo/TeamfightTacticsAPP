import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Champion } from '../models/champion';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  // Names of the grid areas defined in board.component.scss (4 rows x 7 hexes).
  readonly squares = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u',
    'w', 'x', 'y', 'z', 'z1', 'z2', 'z3',
  ];
  team: Champion[] = [];
  saving = false;

  constructor(
    private dialog: MatDialog,
    private favService: FavoritesService,
    public afAuth: AngularFireAuth
  ) {}

  addToTeam(champ: Champion): void {
    this.team = [...this.team, champ];
  }

  removeFromTeam(champ: Champion): void {
    const champIndex = this.team.indexOf(champ);
    if (champIndex === -1) return;
    this.team = this.team.filter((_, i) => i !== champIndex);
  }

  saveToFavorites(): void {
    if (this.team.length === 0 || this.saving) return;

    this.saving = true;
    this.favService
      .addFavTeam({ team: this.team })
      .then(() => this.dialog.open(PopUpComponent))
      .catch((error) => console.error('Could not save team', error))
      .finally(() => (this.saving = false));
  }
}
