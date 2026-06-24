import { NgModule } from "@angular/core";
import { AuthGuard } from "./auth.guard";
import { FeatureGuard } from "./feature.guard";
import { WIPGuard } from "./wip.guard";

@NgModule({
    providers: [AuthGuard, FeatureGuard, WIPGuard]
})
export class GuardsModule {}