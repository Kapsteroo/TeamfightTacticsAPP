import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Champion } from '../models/champion';
import { Class } from '../models/class';
import { Trait } from '../models/trait';
import { ChampionService } from '../services/champion.service';
import { ClassService } from '../services/class.service';
import { TraitService } from '../services/trait.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss'],
})
export class ChampionsComponent implements OnInit, OnDestroy {
  champions: Champion[] = [];
  chosenChampion?: Champion;
  // Traits and classes of the chosen champion, in display order.
  synergies: Array<{ name: string; image: string }> = [];

  private traits = new Map<string, Trait>();
  private classes = new Map<string, Class>();
  private subscription?: Subscription;

  constructor(
    private championService: ChampionService,
    private traitService: TraitService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.championService.getChampions(),
      this.traitService.getTraits(),
      this.classService.getClasses(),
    ]).subscribe(([champions, traits, classes]) => {
      this.champions = champions;
      this.traits = indexByIdAndName(traits);
      this.classes = indexByIdAndName(classes);
      if (this.chosenChampion) this.chooseChampion(this.chosenChampion);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  chooseChampion(chosenChampion: Champion) {
    this.chosenChampion = chosenChampion;
    const traits = [chosenChampion.trait, chosenChampion.trait2]
      .map((name) => name && this.traits.get(name))
      .filter((t): t is Trait => !!t)
      .map((t) => ({ name: t.name, image: t.traitImage }));
    const classes = [chosenChampion.class, chosenChampion.class2]
      .map((name) => name && this.classes.get(name))
      .filter((c): c is Class => !!c)
      .map((c) => ({ name: c.name, image: c.classImage }));
    this.synergies = [...traits, ...classes];
  }
}

// Champions reference traits/classes by document id, which normally equals the name.
function indexByIdAndName<T extends { id?: string; name: string }>(
  list: T[]
): Map<string, T> {
  const index = new Map<string, T>();
  list.forEach((entry) => {
    index.set(entry.name, entry);
    if (entry.id) index.set(entry.id, entry);
  });
  return index;
}
