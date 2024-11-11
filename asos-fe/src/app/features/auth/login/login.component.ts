import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service.service';
import { HashingService } from '../service/hashing.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialog: MatDialog) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email input
      password: ['', [Validators.required, Validators.minLength(6)]]  // Plain text password
    });
  }

  openForgotPasswordDialog(): void {
    this.dialog.open(ForgotPasswordComponent, {
      width: '400px', // You can adjust the width as needed
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(response => {
        // Save the JWT token in localStorage or sessionStorage
        localStorage.setItem('access_token', response.access_token);

        // Redirect to the dashboard
        window.location.href = '/dashboard';  // or use Angular router to navigate
      }, error => {
        console.error('Login failed:', error);
      });
    }
  }
}
