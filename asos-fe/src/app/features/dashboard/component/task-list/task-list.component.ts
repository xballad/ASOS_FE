import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/service/auth.service.service';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  email: string | null = null;

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit(): void {
    this.email = this.authService.getUserEmail();
    if (this.email) {
      this.taskService.getTasksByEmail(this.email).subscribe(
        (data) => {
          this.tasks = data;
        },
        (error) => {
          console.error('Error fetching tasks:', error);
        }
      );
    }
  }

  
  getTasksByStatus(status: string): any[] {
    return this.tasks.filter(task => task.status_task === status);
  }
}
