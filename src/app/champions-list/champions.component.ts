import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Champion } from '../models/champion';
import { Class } from '../models/class';
import { Trait } from '../models/trait';
import { ChampionService } from '../services/champion.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss'],
})
export class ChampionsComponent implements OnInit {
  champions: Champion[];
  chosenChampion: Champion;
  trait: Trait;
  champClass: Class;
  champClass2: Class;

  constructor(
    private championService: ChampionService,
    public afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.championService.getChampions().subscribe((champions) => {
      this.champions = champions;
    });
  }

  chooseChampion(chosenChampion: Champion) {
    this.chosenChampion = chosenChampion;
    this.afs
      .collection('traits')
      .doc(chosenChampion.trait)
      .valueChanges()
      .subscribe((trait) => {
        this.trait = trait as Trait;
      });
    this.afs
      .collection('classes')
      .doc(chosenChampion.class)
      .valueChanges()
      .subscribe((champClass) => {
        this.champClass = champClass as Class;
      });
    if (chosenChampion.class2 != null) {
      this.afs
        .collection('traits')
        .doc(chosenChampion.trait)
        .valueChanges()
        .subscribe((champClass2) => {
          this.champClass2 = champClass2 as Class;
        });
    }
  }
}
