import { NgModule } from "@angular/core";
import { TranslatePipe } from "./translate.pipe";
import { TranslateAsyncPipe } from "./translate-async.pipe";

const PIPES = [TranslatePipe, TranslateAsyncPipe];

@NgModule({
    declarations: [...PIPES],
    exports: [...PIPES]
})
export class PipesModule {}