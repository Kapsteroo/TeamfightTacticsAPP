import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  itemComponent1: Observable<Item>;
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
    console.log(chosenItem);
    if (chosenItem.component1 != null) {
      const doc = this.afs
        .collection('items')
        .doc('baseItems')
        .collection('baseItems')
        .doc(chosenItem.component1)
        .get();
      
      // this.itemComponent1 = snapshot.pipe(
      //   map((changes) => {
      //     return changes.get((a) => {
      //       const data = a.payload.doc.data() as Item;
      //       return data;
      //     });
      //   })
      // );
      
      console.log(doc);
    }
  }
}
