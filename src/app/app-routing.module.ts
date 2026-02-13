import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';

export enum Paths {
  LOGIN = 'login',
  REGISTER = 'register'
}

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: Paths.LOGIN, pathMatch: 'full', component: LoginComponent },
  { path: Paths.REGISTER, pathMatch: 'full', component: RegisterComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
