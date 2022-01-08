import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseItem } from '../models/baseItem';

@Injectable({
  providedIn: 'root',
})
export class BaseItemService {
  baseItemsCollection: AngularFirestoreCollection<BaseItem>;
  baseItems: Observable<BaseItem[]>;

  constructor(public afs: AngularFirestore) {
    this.baseItemsCollection = afs.collection('items').doc('baseItems').collection('baseItems');
    this.baseItems = this.baseItemsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as BaseItem;
          return data;
        });
      })
    );
  }
  getBaseItems() {
    return this.baseItems;
  }
}
