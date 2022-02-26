import { Component, OnInit } from '@angular/core';
import { Champion } from '../models/champion';
import { Trait } from '../models/trait';
import { ChampionService } from '../services/champion.service';
import { TraitService } from '../services/trait.service';

@Component({
  selector: 'app-traits',
  templateUrl: './traits.component.html',
  styleUrls: ['./traits.component.scss'],
})
export class TraitsComponent implements OnInit {
  traits: Trait[];
  champions: Champion[];

  constructor(private traitService: TraitService, private championService: ChampionService) {}

  ngOnInit(): void {
    this.traitService.getTraits().subscribe((traits) => {
      this.traits = traits;
    });
    this.championService.getChampions().subscribe((champions) => {
      this.champions = champions;
    })
  }
}
