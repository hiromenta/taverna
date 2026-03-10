import { NgModule } from "@angular/core";
import { AuthGuard } from "./auth.guard";
import { FeatureGuard } from "./feature.guard";

@NgModule({
    providers: [AuthGuard, FeatureGuard]
})
export class GuardsModule {}