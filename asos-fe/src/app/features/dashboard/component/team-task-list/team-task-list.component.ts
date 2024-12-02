import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { AuthService } from '../../../auth/service/auth.service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-team-task-list',
  templateUrl: './team-task-list.component.html',
  styleUrls: ['./team-task-list.component.css']
})
export class TeamTaskListComponent implements OnInit {
  tasks: any[] = [];
  email: string | null = null;
  draggedTask: any = null;
  isPopupVisible: boolean = false;
  selectedTask: any = null;
  teams: any[] = [];
  selectedTeamId: number | null = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.email = this.authService.getUserEmail();
    if (this.email) {
      this.loadTeams();
    }
  }

  loadTeams(): void {
    if (this.email) {
      this.taskService.getTeamsForMembers({ email_user: this.email }).subscribe(
        (teams) => {
          this.teams = teams;
          this.loadTeamTasks();
        },
        (error) => {
          console.error('Error fetching teams:', error);
        }
      );
    }
  }

  onTeamChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTeamId = selectElement.value ? Number(selectElement.value) : null;
    this.loadTeamTasks();
  }

  loadTeamTasks(): void {
    if (this.email) {
      this.taskService.getTeamTasksByEmailAndTeam(this.email, this.selectedTeamId).subscribe(
        (data) => {
          this.tasks = data;
        },
        (error) => {
          console.error('Error fetching team tasks:', error);
        }
      );
    }
  }

  getTasksByStatus(status: string): any[] {
    return this.tasks.filter(task => task.status_task === status);
  }

  dragStartTask(event: DragEvent, task: any): void {
    this.draggedTask = task;
    event.dataTransfer?.setData('text', task.id);
    (event.target as HTMLElement).style.opacity = '0.5';
  }

  allowDropTask(event: DragEvent): void {
    event.preventDefault();
  }

  dropTask(event: DragEvent, status: string): void {
    event.preventDefault();
    if (this.draggedTask) {
      this.updateTaskStatus(this.draggedTask, status);
      this.tasks = this.tasks.filter(task => task.id !== this.draggedTask.id);
      this.draggedTask.status_task = status;
      this.tasks.push(this.draggedTask);
      this.draggedTask = null;
    }
  }

  updateTaskStatus(task: any, status: string): void {
    const taskId = task.id; 
    this.taskService.updateTaskStatus(taskId, status).subscribe(
      (response) => {
        console.log('Task status updated successfully on backend:', response);
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating task status on backend:', error);
      }
    );
  }

  openTaskPopup(task: any): void {
    this.selectedTask = task;
    this.isPopupVisible = true;
  }
  
  closeTaskPopup(): void {
    this.isPopupVisible = false;
    this.selectedTask = null;
  }
}