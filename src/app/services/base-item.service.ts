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
export class BaseItemService {
  baseItemsCollection: AngularFirestoreCollection<Item>;
  baseItems: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {
    this.baseItemsCollection = afs.collection('items').doc('baseItems').collection<Item>('baseItems');
    this.baseItems = this.baseItemsCollection.valueChanges({ idField: 'id' });
  }

  getBaseItems() {
    return this.baseItems;
  }
}
