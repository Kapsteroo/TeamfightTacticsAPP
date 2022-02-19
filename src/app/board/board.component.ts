import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Champion } from '../models/champion';
import { FavTeam } from '../models/favTeam';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { AuthService } from '../services/auth.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  team: Champion[] = [];
  teamMembersNames: string[] = [];
  userID: string | undefined;
  teamToSave: FavTeam = {
    team: [],
  };

  constructor(
    private dialogRef: MatDialog,
    private authService: AuthService,
    private favService: FavoritesService
  ) {}

  ngOnInit(): void {}

  addToTeam(champ: Champion): void {
    this.team.push(champ);
    console.log(this.team);
    console.log(this.authService.getUserID());
  }

  removeFromTeam(champ: Champion): void {
    const champIndex = this.team.findIndex((c) => c !== champ);
    this.team.splice(champIndex, 1);
    console.log(this.team);
  }

  saveToFavorites() {
    if (this.team) {
      this.teamToSave.team = this.team;
    }
    this.favService.setCollection(this.authService.getUserID());
    this.favService.addFavTeam(this.teamToSave);
    this.dialogRef.open(PopUpComponent);
  }
}
