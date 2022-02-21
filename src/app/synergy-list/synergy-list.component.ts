import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Champion } from '../models/champion';
import { ClassService } from '../services/class.service';
import { TraitService } from '../services/trait.service';
import { Class } from '../models/class';
import { Trait } from '../models/trait';

@Component({
  selector: 'app-synergy-list',
  templateUrl: './synergy-list.component.html',
  styleUrls: ['./synergy-list.component.scss'],
})
export class SynergyListComponent implements OnInit, OnChanges {
  classAndTraitArray: Array<string> = [
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
    'Twinshot',
  ];
  classesAndTraitsData: Map<string, string> = new Map();
  classesAndTraitCounter: Map<string, number> = new Map();
  finalMap: Map<Array<string>, number> = new Map();
  classes: Class[];
  traits: Trait[];

  @Input()
  team: Champion[];

  constructor(
    private classService: ClassService,
    private traitService: TraitService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.traits.forEach((traitName) => {
      this.classesAndTraitsData.set(traitName.name, traitName.traitImage);
    });
    this.classes.forEach((className) => {
      this.classesAndTraitsData.set(className.name, className.classImage);
    });

    if (changes.team) {
      this.classesAndTraitsData.forEach(
        (classImage: string, className: string) => {
          var counter = 0;
          var array = [classImage, className];
          for (let i = 0; i < changes.team.currentValue.length; i++) {
            if (
              className === changes.team.currentValue[i].class ||
              className === changes.team.currentValue[i].class2 ||
              className === changes.team.currentValue[i].trait ||
              className === changes.team.currentValue[i].trait2
            ) {
              counter++;
            }
          }
          this.classesAndTraitCounter.set(className, counter);
          this.finalMap.set(array, counter);
        }
      );
      console.log(this.finalMap);
    }
    // console.log(this.TraitsAndClassesMap);
    // console.log(this.classesAndTraitsData);
    // console.log(this.classesAndTraitCounter);
    console.log(this.classesAndTraitCounter);
  }

  ngOnInit(): void {
    this.classService.getClasses().subscribe((classes) => {
      this.classes = classes;
    });
    this.traitService.getTraits().subscribe((traits) => {
      this.traits = traits;
    });
  }

  showArray() {
    console.log(this.classesAndTraitsData);
  }
}
