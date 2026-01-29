import { NgModule } from "@angular/core";
import { TranslatePipe } from "./translate.pipe";

const PIPES = [TranslatePipe];

@NgModule({
    declarations: [...PIPES],
    exports: [...PIPES]
})
export class PipesModule {}