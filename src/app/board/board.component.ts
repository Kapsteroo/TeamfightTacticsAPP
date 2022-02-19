import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Champion } from '../models/champion';
import { FavTeam } from '../models/favTeam';
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
    private authService: AuthService,
    private favService: FavoritesService
  ) {}

  ngOnInit(): void {}

  addToTeam(champ: Champion): void {
    this.team.push(champ);
    this.teamMembersNames.push(champ.name);
    console.log(this.team);
    console.log(this.teamMembersNames);
    console.log(this.authService.getUserID());
  }

  removeFromTeam(champ: Champion): void {
    const champIndex = this.team.findIndex((c) => c !== champ);
    this.team.splice(champIndex, 1);

    const champIndex2 = this.teamMembersNames.findIndex((d) => d != champ.name);
    this.teamMembersNames.splice(champIndex2, 1);

    console.log(this.team);
    console.log(this.teamMembersNames);
  }

  saveToFavorites() {
    if (this.team) {
      this.teamToSave.team = this.team;
    }
    this.favService.setCollection(this.authService.getUserID());
    this.favService.addFavTeam(this.teamToSave);
  }
}
