import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'https://localhost:8000/api/create-team';
  private apiGetTeamsForMember = 'https://localhost:8000/api/getTeamsForMembers';  // Endpoint for fetching teams
  private apiGetTeamMembers = 'https://localhost:8000/api/teams';  // Endpoint for fetching members
  private apiUpdateTeamInfo = 'https://localhost:8000/api/teams/update/members'


  constructor(private http: HttpClient) { }

  createTeam(teamData: any): Observable<any> {
    return this.http.post(this.apiUrl, teamData);
  }

  getTeamsForUserByEmail(userEmail: string): Observable<any> {
    return this.http.post<any>(this.apiGetTeamsForMember, { email_user: userEmail });
  }

  getTeamMembers(teamId: number): Observable<any> {

    return this.http.get<any>(`https://localhost:8000/api/teams/members/${teamId}`);
  }

  removeMemberFromTeam(teamId: number, memberId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:8000/api/teams/${teamId}/members/${memberId}`);

  }

  updateTeam(team: any): Observable<any> {
    return this.http.put(this.apiUpdateTeamInfo, team);
  }
}
