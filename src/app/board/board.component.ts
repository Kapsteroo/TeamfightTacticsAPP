import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Champion } from '../models/champion';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  team: Champion[] = [];

  constructor(afs: AngularFirestore) {}

  ngOnInit(): void {}

  addToTeam(champ: Champion): void {
    this.team.push(champ);
    console.log(this.team);
  }

  removeFromTeam(champ: Champion): void {
    const champIndex = this.team.findIndex((c) => c !== champ);
    this.team.splice(champIndex, 1);
    console.log(this.team);
  }

  saveToFavorites() {
    
  }
}
