import { Component, OnInit } from '@angular/core';
import { Trait } from '../models/trait';
import { TraitService } from '../services/trait.service';

@Component({
  selector: 'app-traits',
  templateUrl: './traits.component.html',
  styleUrls: ['./traits.component.scss'],
})
export class TraitsComponent implements OnInit {
  traits: Trait[];

  constructor(private traitService: TraitService) {}

  ngOnInit(): void {
    this.traitService.getTraits().subscribe((traits) => {
      this.traits = traits;
    });
  }
}
