import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signupForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    // Firebase rejects passwords shorter than 6 characters.
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  firebaseErrorMessage = '';
  submitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    if (this.signupForm.invalid || this.submitting) return;

    this.submitting = true;
    this.firebaseErrorMessage = '';
    this.authService
      .signupUser(this.signupForm.value)
      .then((result) => {
        if (result.isValid) {
          this.router.navigate(['/home']);
        } else {
          this.firebaseErrorMessage = result.message ?? 'Sign up failed';
        }
      })
      .finally(() => (this.submitting = false));
  }
}
