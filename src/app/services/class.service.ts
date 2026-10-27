import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Class } from '../models/class';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  classesCollection: AngularFirestoreCollection<Class>;
  classes: Observable<Class[]>;

  constructor(public afs: AngularFirestore) {
    this.classesCollection = afs.collection<Class>('classes');
    this.classes = this.classesCollection.valueChanges({ idField: 'id' });
  }

  getClasses() {
    return this.classes;
  }
}
