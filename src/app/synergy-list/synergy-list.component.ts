import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Champion } from '../models/champion';
import { Synergy } from '../models/synergy';
import { ClassService } from '../services/class.service';
import { TraitService } from '../services/trait.service';

@Component({
  selector: 'app-synergy-list',
  templateUrl: './synergy-list.component.html',
  styleUrls: ['./synergy-list.component.scss'],
})
export class SynergyListComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  team: Champion[] = [];

  synergies: Array<Synergy & { name: string }> = [];

  // trait/class name -> icon
  private images = new Map<string, string>();
  private subscription?: Subscription;

  constructor(
    private classService: ClassService,
    private traitService: TraitService
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.traitService.getTraits(),
      this.classService.getClasses(),
    ]).subscribe(([traits, classes]) => {
      this.images = new Map([
        ...traits.map((t): [string, string] => [t.name, t.traitImage]),
        ...classes.map((c): [string, string] => [c.name, c.classImage]),
      ]);
      this.updateSynergies();
    });
  }

  ngOnChanges(): void {
    this.updateSynergies();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private updateSynergies(): void {
    const counters = new Map<string, number>();
    // Like in the game, the same champion placed twice only counts once.
    const uniqueChampions = new Map<string, Champion>();
    (this.team ?? []).forEach((c) => uniqueChampions.set(c.name, c));

    uniqueChampions.forEach((champ) => {
      [champ.trait, champ.trait2, champ.class, champ.class2]
        .filter((name): name is string => !!name)
        .forEach((name) => counters.set(name, (counters.get(name) ?? 0) + 1));
    });

    this.synergies = Array.from(counters, ([name, counter]) => ({
      name,
      counter,
      image: this.images.get(name) ?? '',
    })).sort((a, b) => b.counter - a.counter || a.name.localeCompare(b.name));
  }
}
