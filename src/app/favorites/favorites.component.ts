import { Component } from '@angular/core';
import { FavTeam } from '../models/favTeam';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  favTeams$ = this.favService.getFavTeams();

  constructor(private favService: FavoritesService) {}

  removeTeam(team: FavTeam) {
    if (!confirm('Delete this team?')) return;
    this.favService
      .removeFavTeam(team)
      .catch((error) => console.error('Could not delete team', error));
  }
}
