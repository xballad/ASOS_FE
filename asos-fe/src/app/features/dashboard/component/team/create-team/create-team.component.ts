import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TeamService } from '../../../service/team.service';
import { AuthService } from '../../../../auth/service/auth.service.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})  
export class CreateTeamComponent{
  createTeamForm: FormGroup;

  constructor(private fb: FormBuilder, 
              private teamService: TeamService,
              private auSer: AuthService) {
    this.createTeamForm = this.fb.group({
      teamName: ['', [Validators.required, Validators.minLength(3)]],
      members: this.fb.array([
        this.fb.control('', [Validators.required, Validators.email])
      ])
    });
  }

  ngOnInit(): void {
    const emailCreator = this.auSer.getUserEmail(); 
    this.members.push(this.fb.control(emailCreator, [Validators.required, Validators.email]));
  }


  
  // Getters
  get members(): FormArray {
    return this.createTeamForm.get('members') as FormArray;
  }

  // Add new member field
  addMember() {
    this.members.push(this.fb.control('', [Validators.required, Validators.email]));
  }

  // Remove member field
  removeMember(index: number) {
    this.members.removeAt(index);
  }

  // Submit the form
  onSubmit() {
    if (this.createTeamForm.invalid) {
      alert('Please complete the form correctly.');
      return;
    }

    // Call the service to create the team
    const teamData = {
      teamName: this.createTeamForm.value.teamName,
      members: this.createTeamForm.value.members
    };

    this.teamService.createTeam(teamData).subscribe({
      next: (response) => {
        console.log('Team Created:', response);
        alert('Team created successfully!');
        this.createTeamForm.reset();
      },
      error: (error) => {
        console.error('Error creating team:', error);
        alert('An error occurred while creating the team.');
      }
    });
  }
}
