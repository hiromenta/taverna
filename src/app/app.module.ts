import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuardsModule } from './guards/guards.module';
import { PagesModule } from './pages/pages.module';
import { ConfigModule } from './config/config.module';
import { ServicesModule } from './services/services.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { StartupService } from './services/startup.service';

export function initApp(startup: StartupService) {
  return () => startup.loadAll();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ConfigModule,
    GuardsModule,
    PagesModule,
    ServicesModule,
    DirectivesModule,
    PipesModule,
    SharedModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initApp, deps: [StartupService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
