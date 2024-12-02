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

  // 4. Aktualizácia stavu tasku
  updateTaskStatus(task: any, status: string): void {
    task.status_task = status;
    console.log(`Task with ID: ${task.id} has been moved to ${status}`);
    // Ak máš API na update, tu zavolaj službu na uloženie zmeny
    this.taskService.updateTaskStatus(task).subscribe(
      () => {
        console.log('Task status updated successfully.');
      },
      (error: HttpErrorResponse) => {  // Typujeme parameter error
        console.error('Error updating task status:', error);
      }
    );
  }
}
