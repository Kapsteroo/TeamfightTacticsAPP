import { Component, OnInit } from '@angular/core';
import { BaseItem } from '../models/baseItem';
import { CombinedItem } from '../models/combinedItem';
import { BaseItemService } from '../services/base-item.service';
import { CombinedItemService } from '../services/combined-item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  baseItems: BaseItem[];
  combinedItems: CombinedItem[];

  constructor(private baseItemService: BaseItemService, private combinedItemService: CombinedItemService) { }

  ngOnInit(): void {
    this.baseItemService.getBaseItems().subscribe((baseItems) => {
      this.baseItems = baseItems;
    })
    this.combinedItemService.getCombinedItems().subscribe((combinedItems) => {
      this.combinedItems = combinedItems;
    });
  }

}
