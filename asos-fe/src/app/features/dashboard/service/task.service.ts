import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiCreateTask = 'http://localhost:8000/api/create/task';
  private apiGetTask = 'http://localhost:8000/api/get/user/tasks';
  private apiChangePassword = 'http://localhost:8000/api/user/changepassword';
  private apiUpdateTask = 'http://localhost:8000/api/update/task';

  constructor(private http: HttpClient) {}

  createTask(taskData: any): Observable<any> {
    return this.http.post(this.apiCreateTask, taskData);
  }

  getTasksByEmail(email: string): Observable<any[]> {
    return this.http.post<any[]>(this.apiGetTask, {email_user: email} );
  }

  changePassword(passwordData: { emailUser: any,oldPassword: string; newPassword: string }): Observable<any> {
    console.log(passwordData)
    return this.http.post(this.apiChangePassword, passwordData);
  }
  updateTaskStatus(task: any): Observable<any> {
    return this.http.put(this.apiUpdateTask, task);  // Predpokladám, že API používa HTTP PUT na aktualizáciu
  }
}
