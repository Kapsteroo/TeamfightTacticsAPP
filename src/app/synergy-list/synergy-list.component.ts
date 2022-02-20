import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Champion } from '../models/champion';

@Component({
  selector: 'app-synergy-list',
  templateUrl: './synergy-list.component.html',
  styleUrls: ['./synergy-list.component.scss'],
})
export class SynergyListComponent implements OnInit, OnChanges {
  classArray: Array<string> = [
    'Academy',
    'Chemtech',
    'Clockwork',
    'Cuddly',
    'Enforcer',
    'Glutton',
    'Imperial',
    'Mercenary',
    'Mutant',
    'Scrap',
    'Sister',
    'Socialite',
    'Syndicate',
    'Yordle',
    'YordleLord',
    'Arcanist',
    'Assassin',
    'Bodyguard',
    'Bruiser',
    'Challanger',
    'Collosus',
    'Enchanter',
    'Innovator',
    'Protector',
    'Scholar',
    'Sniper',
    'Transformer',
  ];
  TraitAndClassMap: Map<string, number> = new Map();

  @Input()
  team: Champion[];

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.team) {
      this.classArray.forEach((className) => {
        var counter = 0;
        for (let i = 0; i < changes.team.currentValue.length; i++) {
          if (
            className === changes.team.currentValue[i].class ||
            className === changes.team.currentValue[i].class2 ||
            className === changes.team.currentValue[i].trait ||
            className === changes.team.currentValue[i].trait2
          )
            counter++;
        }
        this.TraitAndClassMap.set(className, counter);
      });
    }
    console.log(this.TraitAndClassMap);
  }

  ngOnInit(): void {}

  showArray() {
    console.log(this.team[0].class);
  }
}
