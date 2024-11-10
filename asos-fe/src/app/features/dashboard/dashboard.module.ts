import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SettingsComponent } from './component/settings/settings.component';
import { CreateTaskComponent } from './component/create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './component/task-list/task-list.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SettingsComponent,
    CreateTaskComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
