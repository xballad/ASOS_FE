import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/service/auth.service.service';
import { TaskService } from '../../service/task.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  email: string | null = null;
  draggedTask: any = null; // Ukladanie ťahaného tasku
  isPopupVisible: boolean = false;
  selectedTask: any = null;
  teams: any[] = [];
  selectedTeamId: number | any = null;


  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit(): void {
    this.email = this.authService.getUserEmail();
    if (this.email) {
      this.loadTeams();
 
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

  loadTeams(): void {
    if (this.email) {
      this.taskService.getTeamsForMembers({ email_user: this.email }).subscribe(
        (teams) => {
          this.teams = teams;
        },
        (error) => {
          console.error('Error fetching teams:', error);
        }
      );
    }
  }

  loadTasks(): void {
    if (this.email) {
      this.taskService.getTasksByEmailAndTeam(this.email, this.selectedTeamId || undefined).subscribe(
        (data) => {
          this.tasks = data;
        },
        (error) => {
          console.error('Error fetching tasks:', error);
        }
      );
    }
  }

  onTeamChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTeamId = selectElement.value ? Number(selectElement.value) : null;
    this.loadTasks();
  }


  getTasksByStatus(status: string): any[] {
    return this.tasks.filter(task => task.status_task === status);
  }

  // 1. Metóda pre začatie ťahania tasku
  dragStartTask(event: DragEvent, task: any): void {
    this.draggedTask = task;
    event.dataTransfer?.setData('text', task.id);
    (event.target as HTMLElement).style.opacity = '0.5';

  }

  // 2. Povolenie drop eventu (prijatie tasku)
  allowDropTask(event: DragEvent): void {
    event.preventDefault();
  }

  // 3. Po ukončení ťahania tasku (presun do novej sekcie)
  dropTask(event: DragEvent, status: string): void {
    event.preventDefault();
    if (this.draggedTask) {
      // Tu zaktualizujeme stav tasku
      this.updateTaskStatus(this.draggedTask, status);
      
      // Presunieme task v UI (môžeš pridať logiku na aktualizáciu tasku v databáze)
      this.tasks = this.tasks.filter(task => task.id !== this.draggedTask.id);
      this.draggedTask.status_task = status;
      this.tasks.push(this.draggedTask);
      this.draggedTask = null; // Vyčistíme referenciu
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
    this.selectedTask = task; // Pass the task to the popup
    this.isPopupVisible = true; // Show the popup
  }
  
  closeTaskPopup(): void {
    this.isPopupVisible = false; // Hide the popup
    this.selectedTask = null; // Clear the selected task
  }
  
}
