import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Champion } from '../models/champion';
import { ChampionService } from '../services/champion.service';

@Component({
  selector: 'app-team-comp-builder',
  templateUrl: './team-comp-builder.component.html',
  styleUrls: ['./team-comp-builder.component.scss'],
})
export class TeamCompBuilderComponent implements OnInit {
  champions: Champion[];

  constructor(private championService: ChampionService) {}

  ngOnInit(): void {
    this.championService.getChampions().subscribe((champions) => {
      this.champions = champions;
    });
  }

  drop(event: CdkDragDrop<Champion[]>) {

    console.log("previousIndex = ", event.previousIndex);

    console.log('currentIndex = ', event.currentIndex);
  }
}
