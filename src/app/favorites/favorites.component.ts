import { Component, OnInit } from '@angular/core';
import { FavTeam } from '../models/favTeam';
import { AuthService } from '../services/auth.service';
import { FavoritesService } from '../services/favorites.service';
import { ChampionService } from '../services/champion.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favTeams: FavTeam[];

  constructor(private favService: FavoritesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.favService.getFavTeams().subscribe((favTeams) => {
      this.favTeams = favTeams;
    });
  }

  showTeams() {
    console.log(this.favTeams);
  }

  removeTeam(team: FavTeam) {
    console.log(team)
  }
}
