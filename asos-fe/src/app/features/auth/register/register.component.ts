import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service.service'; // Import AuthService
import bcrypt from 'bcryptjs'; // Import bcryptjs for hashing passwords

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false; // To control error message visibility after submit

  constructor(private fb: FormBuilder, private authService: AuthService) {
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

      // Hash password before sending it to the backend
      bcrypt.hash(password, 10).then(hashedPassword => {
        const formData = { ...rest, password: hashedPassword };
        this.authService.register(formData).subscribe(response => {
          console.log('Registration successful!', response);
          // Handle navigation or success message
        }, error => {
          console.error('Error during registration:', error);
        });
      }).catch(error => {
        console.error('Error hashing password:', error);
      });
    }
  }
}
