import { Component, OnInit, ViewChild } from '@angular/core';
import { PatchService } from '../services/patch.service';
import { Patch } from '../models/patch';

@Component({
  selector: 'app-add-patch',
  templateUrl: './add-patch.component.html',
  styleUrls: ['./add-patch.component.scss'],
})
export class AddPatchComponent implements OnInit {
  @ViewChild('desc') inputDesc: any;
  patch: Patch = {
    title: '',
    description: [],
  };
  newDescription: '';

  constructor(private patchService: PatchService) {}

  ngOnInit(): void {}

  handleClear() {
    this.newDescription = this.inputDesc.nativeElement.value;
    console.log(this.newDescription);
    this.patch.description.push(this.newDescription);
    this.inputDesc.nativeElement.value = '';
  }

  onSubmit() {
    if (this.patch.title != '') {
      this.patchService.addPatch(this.patch);
      this.patch.title = '';
      this.patch.description = [];
    }
  }
}
