import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserInfo } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn: boolean; // other components can check on this variable for the login status of the user
  user: UserInfo;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {
      // set up a subscription to always know the login status of the user
      console.log(user?.uid);
      if (user) {
        this.user = user;
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
      })
      .catch((error) => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return { isValid: false, message: error.message };
      });
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let user1 = result.user;
        if (user1) user1.sendEmailVerification(); // immediately send the user a verification email
        this.afs.collection('favorites').doc(result.user?.uid).set({});
      })
      .catch((error) => {
        console.log('Auth Service: signup error', error);
        if (error.code) return { isValid: false, message: error.message };
      });
  }

  getUserID() {
    if (this.user) {
      return this.user.uid;
    } else console.log('user not logged');
  }
}
