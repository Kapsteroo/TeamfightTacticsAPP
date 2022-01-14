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
export class BaseItemService {
  baseItemsCollection: AngularFirestoreCollection<Item>;
  baseItems: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {
    this.baseItemsCollection = afs.collection('items').doc('baseItems').collection('baseItems');
    this.baseItems = this.baseItemsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Item;
          return data;
        });
      })
    );
  }
  getBaseItems() {
    return this.baseItems;
  }
}
