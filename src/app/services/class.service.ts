import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Class } from '../models/class';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  classesCollection: AngularFirestoreCollection<Class>;
  classes: Observable<Class[]>;

  constructor(public afs: AngularFirestore) {
    this.classesCollection = afs.collection('classes');
    this.classes = this.classesCollection.snapshotChanges().pipe(
      map((changes) => {
        //here we can get id from database (using value changes it could work)
        return changes.map((a) => {
          const data = a.payload.doc.data() as Class;
          // data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getClasses() {
    return this.classes;
  }
}