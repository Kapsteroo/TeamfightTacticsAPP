import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  signup() {
    if (this.signupForm.invalid)
      // if there's an error in the form, don't submit it
      return;

    this.authService
      .signupUser(this.signupForm.value)
      .then((result) => {
        if (result == null)
          // null is success, false means there was an error
          this.router.navigate(['/home']);
        else if (result.isValid == false)
          this.firebaseErrorMessage = result.message;
      })
      .catch(() => {});
  }
}
