import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class CombinedItemService {
  combinedItemsCollection: AngularFirestoreCollection<Item>;
  combinedItems: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {
    this.combinedItemsCollection = afs.collection('items').doc('combinedItems').collection<Item>('combinedItems');
    this.combinedItems = this.combinedItemsCollection.valueChanges({ idField: 'id' });
  }

  getCombinedItems() {
    return this.combinedItems;
  }
}
