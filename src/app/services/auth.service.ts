import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface AuthResult {
  isValid: boolean;
  message?: string;
}

export interface SignupData {
  displayName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  loginUser(email: string, password: string): Promise<AuthResult> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => ({ isValid: true }))
      .catch((error) => ({ isValid: false, message: error.message }));
  }

  signupUser(data: SignupData): Promise<AuthResult> {
    return this.afAuth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          await user.updateProfile({ displayName: data.displayName });
          // The account already exists at this point, so these are best effort.
          user.sendEmailVerification().catch(console.error);
          this.afs.collection('favorites').doc(user.uid).set({}).catch(console.error);
        }
        return { isValid: true };
      })
      .catch((error) => ({ isValid: false, message: error.message }));
  }
}
