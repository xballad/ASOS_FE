import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component'; // Import LoginComponent

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Update to directly route to LoginComponent
  { path: 'register', component: RegisterComponent }, // Direct route to RegisterComponent
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default to login
  { path: '**', redirectTo: '/login' }, // Redirect unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
