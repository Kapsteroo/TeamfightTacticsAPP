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
import { Synergy } from '../models/synergy';

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
  finalMap: Map<string, Synergy> = new Map();
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
        (classOrTraitImage: string, classOrTraitName: string) => {
          var counter = 0;
          var synergy = {
            image: '',
            counter: 0,
          };
          for (let i = 0; i < changes.team.currentValue.length; i++) {
            if (
              classOrTraitName === changes.team.currentValue[i].class ||
              classOrTraitName === changes.team.currentValue[i].class2 ||
              classOrTraitName === changes.team.currentValue[i].trait ||
              classOrTraitName === changes.team.currentValue[i].trait2
            ) {
              counter++;
            }
            synergy = {
              image: classOrTraitImage,
              counter: counter,
            };
          }
          this.classesAndTraitCounter.set(classOrTraitName, counter);
          this.finalMap.set(classOrTraitName, synergy);
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
