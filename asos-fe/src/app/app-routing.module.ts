import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component'; // Import LoginComponent
import { AuthGuard } from './features/auth/guard/auth.guard';  // Import AuthGuard to protect routes
import { CreateTaskComponent } from './features/dashboard/component/create-task/create-task.component';
import { SettingsComponent } from './features/dashboard/component/settings/settings.component';
import { TeamComponent } from './features/dashboard/component/team/team.component';
import { EditTeamComponent } from './features/dashboard/component/team/edit-team/edit-team.component';
import { CreateTeamComponent } from './features/dashboard/component/team/create-team/create-team.component';
import { TeamTaskListComponent } from './features/dashboard/component/team-task-list/team-task-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route to LoginComponent
  { path: 'register', component: RegisterComponent }, // Route to RegisterComponent
  { path: 'settings', component: SettingsComponent }, // Route to RegisterComponent
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },  // Protect Dashboard route with AuthGuard
  { path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard] },
  { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
  { path: 'team/create-team', component: CreateTeamComponent,canActivate: [AuthGuard] },
  { path: 'team/edit-team', component: EditTeamComponent, canActivate: [AuthGuard] },
  { path: 'team-task-list', component: TeamTaskListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: '**', redirectTo: '/login' }, // Redirect unknown paths to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
