import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Champion } from '../models/champion';
import { Trait } from '../models/trait';
import { ChampionService } from '../services/champion.service';
import { TraitService } from '../services/trait.service';

@Component({
  selector: 'app-traits',
  templateUrl: './traits.component.html',
  styleUrls: ['./traits.component.scss'],
})
export class TraitsComponent {
  rows$: Observable<Array<{ trait: Trait; champions: Champion[] }>>;

  constructor(
    private traitService: TraitService,
    private championService: ChampionService
  ) {
    this.rows$ = combineLatest([
      this.traitService.getTraits(),
      this.championService.getChampions(),
    ]).pipe(
      map(([traits, champions]) =>
        traits.map((trait) => ({
          trait,
          champions: champions.filter(
            (c) => c.trait === trait.name || c.trait2 === trait.name
          ),
        }))
      )
    );
  }
}
