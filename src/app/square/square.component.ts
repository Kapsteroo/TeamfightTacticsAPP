import { CdkDragDrop, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Champion } from '../models/champion';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit {
  champions: Champion[] = [];
  image: string;

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
    } else {
      this.clearArray();
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(event);
  }

  clearArray() {
    this.champions = [];
  }

  clearSquare() {
    this.champions = [];
    this.image = '';
  }
}
