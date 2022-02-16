import { CdkDragDrop, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Champion } from '../models/champion';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit {
  champions: Champion[] = [];
  image: string;

  champToEmit: Champion;

  @Output() eventAddChamp = new EventEmitter<Champion>();
  @Output() eventRemoveChamp = new EventEmitter<Champion>();

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<Champion[]>) {
    if (this.champions.length == 0) {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.image = this.champions[0].champImage;
      this.champToEmit = this.champions[0];
      this.emitChampion(this.champToEmit);
    }
  }

  emitChampion(champ: Champion) {
    this.eventAddChamp.emit(champ);
  }

  clearSquare() {
    this.eventRemoveChamp.emit(this.champions[0]);
    this.champions = [];
    this.image = '';
  }
}
