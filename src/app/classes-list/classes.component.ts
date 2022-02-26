import { Component, OnInit } from '@angular/core';
import { Champion } from '../models/champion';
import { Class } from '../models/class';
import { ChampionService } from '../services/champion.service';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  classes: Class[];
  champions: Champion[];
  
  constructor(private classService: ClassService, private championService: ChampionService) {}

  ngOnInit(): void {
    this.classService.getClasses().subscribe((classes) => {
      this.classes = classes;
    });
    this.championService.getChampions().subscribe((champions) => {
      this.champions = champions;
    })
  }
}
