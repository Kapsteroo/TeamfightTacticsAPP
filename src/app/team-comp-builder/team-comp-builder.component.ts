import { Component } from '@angular/core';
import { ChampionService } from '../services/champion.service';

@Component({
  selector: 'app-team-comp-builder',
  templateUrl: './team-comp-builder.component.html',
  styleUrls: ['./team-comp-builder.component.scss'],
})
export class TeamCompBuilderComponent {
  champions$ = this.championService.getChampions();

  constructor(private championService: ChampionService) {}
}
