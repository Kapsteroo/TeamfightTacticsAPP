import { Component, OnInit } from '@angular/core';
import { PatchService } from '../services/patch.service';
import { Patch } from '../models/patch';

@Component({
  selector: 'app-patch-notes',
  templateUrl: './patch-notes.component.html',
  styleUrls: ['./patch-notes.component.scss'],
})
export class PatchNotesComponent implements OnInit {
  patches: Patch[];

  constructor(private patchService: PatchService) {}

  ngOnInit(): void {
    this.patchService.getPatches().subscribe((patches) => {
      this.patches = patches;
    });
  }
}
