import { NgModule } from "@angular/core";
import { DirectivesModule } from "../directives/directives.module";
import { PipesModule } from "../pipes/pipes.module";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RegisterComponent } from "./register/register.component";
import { SharedModule } from "../shared/shared.module";
import { UpperCasePipe, NgForOf, CurrencyPipe, NgIf } from "@angular/common";
import { WorkInProgressComponent } from "./work-in-progress/work-in-progress.component";
import { ShowcaseComponent } from "./home/showcase/showcase.component";
import { FeaturedComponent } from "./home/featured/featured.component";
import { ShopComponent } from "./shop/shop.component";
import { ProductComponent } from "./shop/product/product.component";

const COMPONENTS = [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    WorkInProgressComponent,
    ShowcaseComponent,
    FeaturedComponent,
    ShopComponent,
    ProductComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [DirectivesModule, PipesModule, SharedModule, UpperCasePipe, NgForOf, CurrencyPipe, NgIf]
})
export class PagesModule {}