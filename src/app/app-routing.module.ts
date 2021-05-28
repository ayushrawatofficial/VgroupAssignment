import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '' , redirectTo:'/home', pathMatch:'full'},
  { path: 'home' , component: HomeComponent, data:{title : 'Welcome'}},
  { path: 'login' , component: LoginComponent, data:{title : 'Login'}},
  { path: 'registration' , component: RegistrationComponent, data:{title : 'New User Registration'}},
  { path: 'dashboard' , component: DashboardComponent, data:{title : 'Dashboard'},canActivate: [AuthGuard]},
  { path: '**' , redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
