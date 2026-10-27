import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PatchService } from '../services/patch.service';

@Component({
  selector: 'app-patch-notes',
  templateUrl: './patch-notes.component.html',
  styleUrls: ['./patch-notes.component.scss'],
})
export class PatchNotesComponent {
  patches$ = this.patchService.getPatches();

  constructor(private patchService: PatchService, public afAuth: AngularFireAuth) {}
}
