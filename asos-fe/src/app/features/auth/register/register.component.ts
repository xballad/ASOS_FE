import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service.service'; // Import AuthService
import bcrypt from 'bcryptjs'; // Import bcryptjs for hashing passwords
import { HashingService } from '../service/hashing.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false; // To control error message visibility after submit

  constructor(private fb: FormBuilder, 
             private authService: AuthService,         
             private router: Router,  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue] // Checkbox for terms
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('repeatPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    this.submitted = true; // Show errors after the user submits the form

    if (this.registerForm.valid) {
      const { password, ...rest } = this.registerForm.value;

      // Send plain text password to backend (no hashing here)
      this.authService.register({ ...rest, password }).subscribe(response => {
        console.log('Registration successful!', response);
        this.router.navigate(['/login']);

        // Handle navigation or success message
      }, error => {
        console.error('Error during registration:', error);
      });
    }
  }
}

