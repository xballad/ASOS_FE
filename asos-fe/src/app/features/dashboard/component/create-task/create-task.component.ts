import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { AuthService } from '../../../auth/service/auth.service.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService, private auSer: AuthService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      status_task: ['To Do', [Validators.required]],
      description: ['', [Validators.required]],
      email_assigned: ['', [Validators.email]], // Make sure this is added
      team_assigned: ['', [Validators.required]]  // Make sure this is added
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.taskForm.valid) {
      const emailCreator = this.auSer.getUserEmail();  // Get the logged-in user's email
      const taskData = { 
        ...this.taskForm.value, 
        email_creator: emailCreator  // Add email_creator to the form data
      };

      this.taskService.createTask(taskData).subscribe(
        response => {
          console.log('Task created successfully', response);
        },
        error => {
          console.error('Error creating task', error);
        }
      );
    }
  }
}
