import { Component, OnInit } from '@angular/core';
import { PatchService } from '../services/patch.service';
import { Patch } from '../models/patch';

@Component({
  selector: 'app-add-patch',
  templateUrl: './add-patch.component.html',
  styleUrls: ['./add-patch.component.scss']
})
export class AddPatchComponent implements OnInit {
  patch: Patch = {
    title: '',
    description: undefined,
    id: undefined
  }

  constructor(private patchService: PatchService) { }

  ngOnInit(): void {
  }

}
