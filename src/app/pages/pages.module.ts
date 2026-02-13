import { NgModule } from "@angular/core";
import { DirectivesModule } from "../directives/directives.module";
import { PipesModule } from "../pipes/pipes.module";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RegisterComponent } from "./register/register.component";
import { SharedModule } from "../shared/shared.module";

const COMPONENTS = [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [DirectivesModule, PipesModule, SharedModule]
})
export class PagesModule {}