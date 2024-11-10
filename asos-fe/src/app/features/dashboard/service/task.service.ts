import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiCreateTask = 'http://localhost:8000/api/create/task';
  private apiGetTask = 'http://localhost:8000/api/get/user/tasks'

  constructor(private http: HttpClient) {}

  createTask(taskData: any): Observable<any> {
    return this.http.post(this.apiCreateTask, taskData);
  }

  getTasksByEmail(email: string): Observable<any[]> {
    return this.http.post<any[]>(this.apiGetTask, {email_user: email} );
  }
}
