import { NgModule } from "@angular/core";
import { ExampleComponent } from "./example/example.component";
import { DirectivesModule } from "../directives/directives.module";
import { PipesModule } from "../pipes/pipes.module";

const COMPONENTS = [ExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [DirectivesModule, PipesModule]
})
export class PagesModule {}