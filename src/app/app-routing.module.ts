import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { FeatureGuard } from './guards/feature.guard';

export enum Paths {
  HOME = '',
  LOGIN = 'login',
  REGISTER = 'register',
  NOT_FOUND = '404'
}

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [FeatureGuard], data: { grantAll: true } },
  { path: Paths.LOGIN, pathMatch: 'full', component: LoginComponent, canActivate: [FeatureGuard], data: { grant: [0] } },
  { path: Paths.REGISTER, pathMatch: 'full', component: RegisterComponent, canActivate: [FeatureGuard], data: { grant: [0] } },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
