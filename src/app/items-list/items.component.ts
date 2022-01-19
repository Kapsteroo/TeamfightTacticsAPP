import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from '../models/item';
import { BaseItemService } from '../services/base-item.service';
import { CombinedItemService } from '../services/combined-item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  baseItems: Item[];
  combinedItems: Item[];
  chosenItem: Item;
  itemComponent1: Item;
  itemComponent2: Item;

  constructor(
    private baseItemService: BaseItemService,
    private combinedItemService: CombinedItemService,
    public afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.baseItemService.getBaseItems().subscribe((baseItems) => {
      this.baseItems = baseItems;
    });
    this.combinedItemService.getCombinedItems().subscribe((combinedItems) => {
      this.combinedItems = combinedItems;
    });
  }

  chooseItem(chosenItem: Item) {
    this.chosenItem = chosenItem;
    if (chosenItem.component1 != null) {
      this.afs
        .collection('items')
        .doc('baseItems')
        .collection('baseItems')
        .doc(chosenItem.component1)
        .valueChanges()
        .subscribe((itemComponent1) => {
          this.itemComponent1 = itemComponent1 as Item;
        });
      this.afs
        .collection('items')
        .doc('baseItems')
        .collection('baseItems')
        .doc(chosenItem.component2)
        .valueChanges()
        .subscribe((itemComponent2) => {
          this.itemComponent2 = itemComponent2 as Item;
        });
    }
  }
}
