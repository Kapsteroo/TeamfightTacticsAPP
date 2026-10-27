import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Item } from '../models/item';
import { BaseItemService } from '../services/base-item.service';
import { CombinedItemService } from '../services/combined-item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit, OnDestroy {
  baseItems: Item[] = [];
  combinedItems: Item[] = [];
  chosenItem?: Item;
  itemComponent1?: Item;
  itemComponent2?: Item;

  private subscription?: Subscription;

  constructor(
    private baseItemService: BaseItemService,
    private combinedItemService: CombinedItemService
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.baseItemService.getBaseItems(),
      this.combinedItemService.getCombinedItems(),
    ]).subscribe(([baseItems, combinedItems]) => {
      this.baseItems = baseItems;
      this.combinedItems = combinedItems;
      if (this.chosenItem) this.chooseItem(this.chosenItem);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  chooseItem(chosenItem: Item) {
    this.chosenItem = chosenItem;
    // Recipe components are stored as ids of documents in the baseItems collection.
    this.itemComponent1 = this.findBaseItem(chosenItem.component1);
    this.itemComponent2 = this.findBaseItem(chosenItem.component2);
  }

  private findBaseItem(id?: string): Item | undefined {
    if (!id) return undefined;
    return this.baseItems.find((item) => item.id === id || item.name === id);
  }
}
