import { Component, OnInit } from '@angular/core';
import { BaseItem } from '../models/baseItem';
import { BaseItemService } from '../services/base-item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  baseItems: BaseItem[];


  constructor(private baseItemService: BaseItemService) { }

  ngOnInit(): void {
    this.baseItemService.getBaseItems().subscribe((baseItems) => {
      this.baseItems = baseItems;
    })
  }

}
