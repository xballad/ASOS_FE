import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SettingsComponent } from './component/settings/settings.component';
import { CreateTaskComponent } from './component/create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './component/task-list/task-list.component';
import { EditTeamComponent } from './component/team/edit-team/edit-team.component';
import { TeamComponent } from './component/team/team.component';
import { CreateTeamComponent } from './component/team/create-team/create-team.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SettingsComponent,
    CreateTaskComponent,
    TaskListComponent,
    CreateTeamComponent,
    EditTeamComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
