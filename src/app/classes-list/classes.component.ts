import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Champion } from '../models/champion';
import { Class } from '../models/class';
import { ChampionService } from '../services/champion.service';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {
  rows$: Observable<Array<{ class: Class; champions: Champion[] }>>;

  constructor(
    private classService: ClassService,
    private championService: ChampionService
  ) {
    this.rows$ = combineLatest([
      this.classService.getClasses(),
      this.championService.getChampions(),
    ]).pipe(
      map(([classes, champions]) =>
        classes.map((cls) => ({
          class: cls,
          champions: champions.filter(
            (c) => c.class === cls.name || c.class2 === cls.name
          ),
        }))
      )
    );
  }
}
