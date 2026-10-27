import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  firebaseErrorMessage = '';
  submitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    if (this.loginForm.invalid || this.submitting) return;

    this.submitting = true;
    this.firebaseErrorMessage = '';
    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        if (result.isValid) {
          this.router.navigate(['/home']);
        } else {
          this.firebaseErrorMessage = result.message ?? 'Login failed';
        }
      })
      .finally(() => (this.submitting = false));
  }
}
