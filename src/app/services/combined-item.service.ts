import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class CombinedItemService {
  combinedItemsCollection: AngularFirestoreCollection<Item>;
  combinedItems: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {
    this.combinedItemsCollection = afs
      .collection('items')
      .doc('combinedItems')
      .collection('combinedItems');
    this.combinedItems = this.combinedItemsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Item;
          return data;
        });
      })
    );
  }
  getCombinedItems() {
    return this.combinedItems;
  }
}
