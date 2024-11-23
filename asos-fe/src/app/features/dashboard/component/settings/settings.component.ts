import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { AuthService } from '../../../auth/service/auth.service.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  changePasswordForm: FormGroup;
  constructor(private fb: FormBuilder,
              private taskService: TaskService,
              private auSer: AuthService
  ) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }
    const emailUser = this.auSer.getUserEmail();  // Get the logged-in user's email
    const { oldPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password don't match!");
      return;
    }


    this.taskService.changePassword({ emailUser,oldPassword, newPassword }).subscribe(
      (response) => {
        alert(response.message);
        this.changePasswordForm.reset();
      },
      (error) => {
        alert(error.error.detail || 'An error occurred. Please try later');
      }
    );
  }
}


