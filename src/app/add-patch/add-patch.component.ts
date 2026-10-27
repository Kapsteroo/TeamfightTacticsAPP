import { Component } from '@angular/core';
import { PatchService } from '../services/patch.service';
import { Patch } from '../models/patch';

@Component({
  selector: 'app-add-patch',
  templateUrl: './add-patch.component.html',
  styleUrls: ['./add-patch.component.scss'],
})
export class AddPatchComponent {
  patch: Patch = {
    title: '',
    description: [],
  };
  newDescription = '';

  constructor(private patchService: PatchService) {}

  addDescription() {
    const description = this.newDescription.trim();
    if (!description) return;
    this.patch.description = [...this.patch.description, description];
    this.newDescription = '';
  }

  onSubmit() {
    const title = this.patch.title.trim();
    if (!title) return;

    this.patchService
      .addPatch({ title, description: this.patch.description })
      .then(() => {
        this.patch = { title: '', description: [] };
      })
      .catch((error) => console.error('Could not add patch', error));
  }
}
