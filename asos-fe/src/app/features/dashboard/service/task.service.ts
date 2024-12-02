import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiCreateTask = 'https://localhost:8000/api/create/task';
  private apiGetTask = 'https://localhost:8000/api/get/user/tasks';
  private apiChangePassword = 'https://localhost:8000/api/user/changepassword';
  private apiUpdateTask = 'https://localhost:8000/api/task/update';
  private apiGetTaskInfo = 'https://localhost:8000/api/get/tasks';  // Your FastAPI backend URL
  private apiUrl = "https://localhost:8000"





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
  updateTaskStatus(taskId: number, status: string): Observable<any> {
    const body = { task_id: taskId, status }; 
    return this.http.put(this.apiUpdateTask, body);  // Predpokladám, že API používa HTTP PUT na aktualizáciu
  }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get<any>(`${this.apiGetTaskInfo}/${taskId}`);
  }

  getTeamsForMembers(emailUser: { email_user: string }): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/api/getTeamsForMembers`, emailUser);
  }

  getTasksByEmailAndTeam(email: string, teamId?: number): Observable<any[]> {
    const url = teamId 
      ? `${this.apiUrl}/api/get/user/tasks?team_id=${teamId}` 
      : `${this.apiUrl}/api/get/user/tasks`;
    return this.http.post<any[]>(url, { email_user: email });
  }

  getTeamTasksByEmail(email: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/api/get/user/team/tasks`, { email_user: email });
  }

  getTeamTasksByEmailAndTeam(email: string, teamId?: number | null): Observable<any[]> {
    let url = `${this.apiUrl}/api/get/user/team/tasks`;
    let body: { email_user: string; team_id?: number } = { email_user: email };
    

    if (teamId !== null && teamId !== undefined) {
      body.team_id = teamId;
    }
    
    return this.http.post<any[]>(url, body);
  }

  addComment(comment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/comments`, comment);
  }
}


