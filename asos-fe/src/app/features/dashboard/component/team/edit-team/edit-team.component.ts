import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { TeamService } from '../../../service/team.service';
import { AuthService } from '../../../../auth/service/auth.service.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css'],
})
export class EditTeamComponent implements OnInit {
  editTeamForm!: FormGroup;
  teams: any[] = [];
  selectedTeamId!: number | null;
  selectedTeam: any;
  teamMembers: { id: number; email: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.editTeamForm = this.fb.group({
      teamName: ['', [Validators.required, Validators.minLength(3)]],
      members: this.fb.array([]),
    });

    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.loadTeamsForUser(userEmail);
    } else {
      console.error('User email is null. Cannot load teams.');
      alert('Failed to load teams: User is not logged in.');
    }
  }

  get members(): FormArray<FormControl> {
    return this.editTeamForm.get('members') as FormArray<FormControl>;
  }

  get teamNameControl(): FormControl {
    return this.editTeamForm.get('teamName') as FormControl;
  }

  // Load all teams for the logged-in user
  loadTeamsForUser(email: string) {
    this.teamService.getTeamsForUserByEmail(email).subscribe(
      (teams) => {
        this.teams = teams;
        if (this.teams.length > 0) {
          this.selectedTeamId = this.teams[0].id;
          this.loadTeam(this.selectedTeamId!);
        }
      },
      (error) => {
        console.error('Failed to load teams:', error);
      }
    );
  }
  

  // Load details of the selected team
  loadTeam(teamId: number) {
    const team = this.teams.find((t) => t.id === teamId);
    if (team) {
      this.selectedTeam = team;
      this.selectedTeamId = teamId;
  
      this.teamService.getTeamMembers(teamId).subscribe(
        (members: { id: number; email: string }[]) => {
          this.teamMembers = members;
  
          // Update form values
          this.editTeamForm.patchValue({
            teamName: team.name,  // Set the team name in the form
          });
          this.members.clear();
          members.forEach((member) => {
            this.members.push(
              this.fb.control(member.email, [Validators.required, Validators.email])
            );
          });
        },
        (error) => {
          console.error('Failed to load team members:', error);
        }
      );
    }
  }
  

  // Handle dropdown selection change
  onTeamSelect(event: Event) {
    const selectedId = parseInt((event.target as HTMLSelectElement).value, 10);
    this.selectedTeamId = selectedId;
    this.loadTeam(selectedId);
  }

  // Add a new member
  addMember() {
    this.members.push(this.fb.control('', [Validators.required, Validators.email]));
  }

  // Remove a member
  removeMember(index: number) {
    this.members.removeAt(index);
  }

  // Submit the form to save changes
  onUpdate() {
    if (this.editTeamForm.invalid || this.selectedTeamId === null) {
      alert('Please complete the form correctly.');
      return;
    }
  
    const updatedTeam = {
      team_id: this.selectedTeamId!,
      team_name: this.editTeamForm.value.teamName,  // Send the updated team name
      members: this.editTeamForm.value.members,    // Send the updated member list
    };
  
    this.teamService.updateTeam(updatedTeam).subscribe(
      (response) => {
        alert('Team updated successfully!');
        this.loadTeam(this.selectedTeamId!);  // Reload the updated team data
      },
      (error) => {
        console.error('Failed to update the team:', error);
        alert('Failed to update the team.');
      }
    );
  }
  
  

  removeMemberFromTeam(memberId: number) {
    this.teamService.removeMemberFromTeam(this.selectedTeamId!, memberId).subscribe(
      () => {
        this.teamMembers = this.teamMembers.filter(
          (member) => member.id !== memberId
        );
        this.loadTeam(this.selectedTeamId!);
      },
      (error) => {
        console.error('Failed to remove member:', error);
        alert('Failed to remove member.');
      }
    );
  }
}
