import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Output } from '@angular/core';
import { Champion } from '../models/champion';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent {
  // cdkDropList needs an array as its data, but a square holds at most one champion.
  champions: Champion[] = [];

  @Output() eventAddChamp = new EventEmitter<Champion>();
  @Output() eventRemoveChamp = new EventEmitter<Champion>();

  get champion(): Champion | undefined {
    return this.champions[0];
  }

  drop(event: CdkDragDrop<Champion[]>) {
    if (this.champion) return;

    const champ = event.previousContainer.data[event.previousIndex];
    if (!champ) return;
    this.champions = [champ];
    this.eventAddChamp.emit(champ);
  }

  clearSquare() {
    const champ = this.champion;
    if (!champ) return;
    this.champions = [];
    this.eventRemoveChamp.emit(champ);
  }
}
