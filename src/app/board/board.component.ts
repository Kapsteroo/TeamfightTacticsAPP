import { Component, OnInit } from '@angular/core';
import { Champion } from '../models/champion';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selected(champ: Champion): void{
    console.log(champ);
  }
}
